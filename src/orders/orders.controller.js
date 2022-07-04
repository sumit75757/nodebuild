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
const orders_model_1 = __importDefault(require("./orders.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const mongoos = require("mongoose");
const orders = {
    getOrder(req, res) {
        orders_model_1.default
            .find({ userId: req.params.id })
            .then((result) => {
            let data = {
                message: "order",
                result: result,
            };
            res.status(200).json(data);
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    },
    order(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let prod;
            yield product_model_1.default
                .findById(req.body.productId)
                .exec()
                .then((result) => {
                prod = result;
            })
                .catch((err) => {
                res.status(500).json(err.errors);
            });
            const ordders = new orders_model_1.default({
                _id: new mongoos.Types.ObjectId(),
                userId: req.body.userId,
                productId: req.body.productId,
                quantity: req.body.quantity,
                price: prod.price * req.body.quantity,
                payment: req.body.payment,
                crreatAt: Date(),
            });
            console.log("fasdfasdfsa", prod.price);
            ordders
                .save()
                .then((result) => {
                let data = {
                    message: "order plased",
                    result: result,
                };
                res.status(201).json(data);
            })
                .catch((err) => {
                res.status(400).json(err);
            });
        });
    },
};
exports.default = orders;
//# sourceMappingURL=orders.controller.js.map