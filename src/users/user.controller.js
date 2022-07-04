"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const sellers = {
    getseller(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.query.skip, req.query.limit);
            let a = req.query.serch;
            console.log(a);
            let serch = "";
            if (a == undefined && a == "undefined") {
                serch = '';
            }
            else {
                serch = req.query.serch;
            }
            var re = new RegExp(serch, "i");
            yield auth_model_1.default
                .find({ character: "User" })
                .or([{ username: { $regex: re } }, { email: { $regex: re } }])
                .sort("title")
                .skip(req.query.skip)
                .limit(req.query.limit)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                yield auth_model_1.default
                    .find({ character: "User" })
                    .or([{ username: { $regex: re } }, { email: { $regex: re } }])
                    .sort("title")
                    .count()
                    .then((ress) => {
                    console.log(result);
                    const arr = [];
                    result.forEach((element) => {
                        const obj = {
                            _id: element._id,
                            username: element.username,
                            email: element.email,
                            character: element.character,
                            satate: element.satate,
                            crreatAt: element.crreatAt,
                            lastLogin: element.lastLogin,
                        };
                        arr.push(obj);
                    });
                    console.log(ress);
                    const responseData = {
                        count: ress,
                        response: "success",
                        users: arr,
                    };
                    res.status(200).json(responseData);
                });
            }))
                .catch((err) => {
                res.status(400).json(err);
            });
        });
    },
};
exports.default = sellers;
//# sourceMappingURL=user.controller.js.map