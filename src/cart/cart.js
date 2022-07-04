"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../Middleware/chackauth"));
const cart_controller_1 = __importDefault(require("./cart.controller"));
const route = (0, express_1.default)();
route.get("/:id", chackauth_1.default, cart_controller_1.default.getCart);
route.post("/", chackauth_1.default, cart_controller_1.default.addCart);
route.put("/:id", chackauth_1.default, cart_controller_1.default.updateCart);
route.delete("/:id", chackauth_1.default, cart_controller_1.default.removeCart);
exports.default = route;
//# sourceMappingURL=cart.js.map