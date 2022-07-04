"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../Middleware/chackauth"));
const category_controler_1 = __importDefault(require("./category.controler"));
const route = (0, express_1.default)();
route.get("/", chackauth_1.default, category_controler_1.default.getCatagory);
route.get("/:id", chackauth_1.default, category_controler_1.default.getByCatagory);
route.post("/", chackauth_1.default, category_controler_1.default.addCatagory);
route.put("/:id", chackauth_1.default, category_controler_1.default.updateCatagory);
route.delete("/:id", chackauth_1.default, category_controler_1.default.removeCatagory);
exports.default = route;
//# sourceMappingURL=addCategory.js.map