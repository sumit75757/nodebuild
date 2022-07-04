"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chackauth_1 = __importDefault(require("../Middleware/chackauth"));
const product_controll_1 = __importDefault(require("./product.controll"));
const multer_1 = __importDefault(require("multer"));
const route = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './productImage/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const uplode = (0, multer_1.default)({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
route.get('/', chackauth_1.default, product_controll_1.default.getProduct);
route.get('/:id', chackauth_1.default, product_controll_1.default.productgetbyid);
route.post('/', chackauth_1.default, uplode.array('productImage', 7), product_controll_1.default.postProduct);
route.delete('/:id', chackauth_1.default, product_controll_1.default.removeProduct);
route.put('/:id', chackauth_1.default, uplode.array('productImage', 7), product_controll_1.default.productupdate);
exports.default = route;
//# sourceMappingURL=product.js.map