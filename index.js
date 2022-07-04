"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app"));
require("dotenv").config();
const port = process.env.PORT || process.env.PORT;
const httpServer = http_1.default.createServer(app_1.default);
httpServer.listen(port);
//# sourceMappingURL=index.js.map