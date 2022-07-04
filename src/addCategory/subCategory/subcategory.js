"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../../Middleware/chackauth"));
const subCategory_controller_1 = __importDefault(require("./subCategory.controller"));
const route = (0, express_1.default)();
route.get("/", chackauth_1.default, subCategory_controller_1.default.getCatagory);
route.get("/:id", chackauth_1.default, subCategory_controller_1.default.getByCatagory);
route.post("/", chackauth_1.default, subCategory_controller_1.default.addCatagory);
route.put("/:id", chackauth_1.default, subCategory_controller_1.default.updateCatagory);
route.delete("/:id", chackauth_1.default, subCategory_controller_1.default.removeCatagory);
exports.default = route;
//# sourceMappingURL=subcategory.js.map