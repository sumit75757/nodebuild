"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../../Middleware/chackauth"));
const product_controller_1 = __importDefault(require("./product.controller"));
const route = (0, express_1.default)();
route.get("/:id", chackauth_1.default, product_controller_1.default.getgetproduct);
exports.default = route;
//# sourceMappingURL=product.js.map