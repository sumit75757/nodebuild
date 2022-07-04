"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const cart_model_1 = __importDefault(require("./cart.model"));
const carts = {
    removeCart(req, res) {
        const id = req.params.id;
        cart_model_1.default.remove({ _id: id })
            .then((result) => {
            let obj = {
                response: "sucsess",
                data: result,
            };
            res.status(200).json(obj);
        })
            .catch((err) => {
            res.status(200).json(err);
        });
    },
    updateCart(req, res) {
        const id = req.params.id;
        const qty = req.body.qty;
        let obj = {
            quantity: qty,
        };
        cart_model_1.default
            .findByIdAndUpdate({
            _id: id,
        }, {
            $set: obj,
        })
            .then((result) => {
            let obj = {
                response: "sucsess",
                data: result,
            };
            res.status(200).json(obj);
        })
            .catch((err) => {
            res.status(200).json(err);
        });
    },
    getCart(req, res) {
        const id = req.params.id;
        cart_model_1.default
            .aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "prod",
                },
            },
        ])
            .then((result) => {
            let prodArr = [];
            let data = result.filter((d) => d.userId == id);
            data.forEach((element) => {
                element.product = element.prod[0];
                delete element.prod;
                console.log(delete element.prod);
            });
            let obj = {
                count: data.length,
                response: "sucsess",
                data: data,
            };
            res.status(200).json(obj);
        })
            .catch((err) => {
            console.log("ERROR", err);
        });
    },
    addCart(req, res) {
        const cartss = new cart_model_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            crreatAt: Date(),
        });
        console.log(cartss);
        cartss
            .save()
            .then((result) => {
            res.status(201).json(result);
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    },
};
exports.default = carts;
//# sourceMappingURL=cart.controller.js.map