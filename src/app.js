"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./auth/auth"));
const cors_1 = __importDefault(require("cors"));
const addCategory_1 = __importDefault(require("./addCategory/addCategory"));
const product_1 = __importDefault(require("./product/product"));
const admin_1 = __importDefault(require("./admin/admin"));
const subcategory_1 = __importDefault(require("./addCategory/subCategory/subcategory"));
const seller_1 = __importDefault(require("./seller/seller"));
const product_2 = __importDefault(require("./seller/product/product"));
const user_1 = __importDefault(require("./users/user"));
const cart_1 = __importDefault(require("./cart/cart"));
const orders_1 = __importDefault(require("./orders/orders"));
const app = (0, express_1.default)();
require("dotenv").config();
const database = process.env.MONGO_URL_LOCAL;
console.log(database);
mongoose_1.default
    .connect(database)
    .then((res) => {
    console.log("database conected");
    console.log("http://localhost:" + process.env.PORT + "/");
})
    .catch((err) => {
    console.log("database not conected", err);
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api/auth", auth_1.default);
app.use("/api/admin/auth", admin_1.default);
app.use("/api/catogory", addCategory_1.default);
app.use("/api/subcatogory", subcategory_1.default);
app.use("/productImage", express_1.default.static("productImage"));
app.use("/userImage", express_1.default.static("userImage"));
app.use("/api/users", user_1.default);
app.use("/api/sellers", seller_1.default);
app.use("/api/product", product_1.default);
app.use("/api/cart", cart_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/seller/product", product_2.default);
app.use((res, req, next) => {
    const err = new Error("404 Not Found");
    err.status = 404;
    err.message = "not found";
    console.log(err);
    next();
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map