"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const authChack = (req, res, next) => {
    try {
        if (req.headers.authorization !== "") {
            const token = req.headers.authorization.split(" ")[1];
            const jwtSECRET = process.env.JWT_SECRET;
            const decode = jsonwebtoken_1.default.verify(token, jwtSECRET);
            req.userData = decode;
        }
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "auth fail",
        });
        const err = new Error("401 Not Found");
        err.status = 401;
        next();
    }
};
exports.default = authChack;
//# sourceMappingURL=chackauth.js.map