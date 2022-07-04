"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../Middleware/chackauth"));
const seller_controller_1 = __importDefault(require("./seller.controller"));
const route = (0, express_1.default)();
route.get("/", chackauth_1.default, seller_controller_1.default.getseller);
exports.default = route;
//# sourceMappingURL=seller.js.map