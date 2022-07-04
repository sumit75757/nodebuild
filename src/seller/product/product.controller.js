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
const product_model_1 = __importDefault(require("../../product/product.model"));
const products = {
    getgetproduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            console.log(req.query.skip, req.query.limit);
            let a = req.query.serch;
            console.log(a);
            let serch = "";
            if (a == undefined && a == "undefined") {
                serch = "";
            }
            else {
                serch = req.query.serch;
            }
            var re = new RegExp(serch, "i");
            yield product_model_1.default
                .find({ sellerId: req.params.id })
                .or([{ productName: { $regex: re } }, { productInfo: { $regex: re } }])
                .then((result) => {
                product_model_1.default
                    .find({ sellerId: req.params.id })
                    .count()
                    .then((count) => {
                    const arr = [];
                    const responseData = {
                        count: count,
                        response: "success",
                        product: result,
                    };
                    res.status(200).json(responseData);
                });
            })
                .catch((err) => {
                res.status(400).json(err);
            });
        });
    },
};
exports.default = products;
//# sourceMappingURL=product.controller.js.map