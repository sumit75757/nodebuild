"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userImage: { type: String, required: false },
    phone: { type: Number, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: Number, required: false },
    age: { type: Number, required: false },
    zender: { type: String, required: false },
    character: { type: String, required: true },
    satate: { type: Boolean, required: false, default: true },
    crreatAt: { type: String, required: true },
    lastLogin: { type: String },
});
exports.default = mongoose_1.default.model('auth', authSchema);
//# sourceMappingURL=auth.model.js.map