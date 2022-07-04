"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chackauth_1 = __importDefault(require("../Middleware/chackauth"));
const orders_controller_1 = __importDefault(require("./orders.controller"));
const route = express();
route.get("/:id", chackauth_1.default, orders_controller_1.default.getOrder);
route.post("/", chackauth_1.default, orders_controller_1.default.order);
exports.default = route;
//# sourceMappingURL=orders.js.map