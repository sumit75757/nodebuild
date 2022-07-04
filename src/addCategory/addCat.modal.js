"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose = require("mongoose");
const catogorySchema = new mongoose.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    catgory: { type: String, required: true },
    name: { type: String, required: true },
    crreatAt: { type: String, required: true },
    updateAt: { type: String },
});
exports.default = mongoose_1.default.model("cats", catogorySchema);
//# sourceMappingURL=addCat.modal.js.map