"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = (0, express_1.default)();
const chackauth_1 = __importDefault(require("../../Middleware/chackauth"));
const otpEmail_controller_1 = __importDefault(require("./otpEmail.controller"));
route.post('/', chackauth_1.default, otpEmail_controller_1.default.email);
route.post('/otp', chackauth_1.default, otpEmail_controller_1.default.verify);
exports.default = route;
//# sourceMappingURL=email.js.map