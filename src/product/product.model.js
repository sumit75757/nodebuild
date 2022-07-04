"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    productName: {
        type: String,
        required: true,
    },
    productInfo: {
        type: String,
        required: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    catogory: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true
    },
    productImage: {
        type: Array,
    },
    discrption: {
        type: String,
    },
    subCatogory: {
        type: String,
        required: true
    },
    delevery: {
        type: Number,
        // required: true
    },
    createAt: String,
});
exports.default = mongoose_1.default.model("product", product);
//# sourceMappingURL=product.model.js.map