"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const admin = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    character: { type: String, required: true },
    crreatAt: { type: String, required: true },
    lastLogin: { type: String }
});
exports.default = mongoose_1.default.model('admin', admin);
//# sourceMappingURL=admin.model.js.map