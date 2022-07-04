"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_model_1 = __importDefault(require("./auth.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const forgotpassword_1 = __importDefault(require("./forgotPassword/forgotpassword"));
const route = (0, express_1.default)();
require("dotenv").config();
const email_1 = __importDefault(require("./otp/email"));
const multer_1 = __importDefault(require("multer"));
const jWT_SECRET = process.env.JWT_SECRET;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./userImage/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const uplode = (0, multer_1.default)({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});
const fs = require("fs");
const util_1 = require("util");
const chackauth_1 = __importDefault(require("../Middleware/chackauth"));
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
// console.log("dfasdF", jWT_SECRET);
route.post('/singup', uplode.single('userImage'), (req, res, next) => {
    auth_model_1.default.find({
        email: req.body.email
    }).exec().then((result) => {
        console.log(req.body);
        if (result.length >= 1) {
            return res.status(409).json({
                code: '409',
                message: 'user exist',
            });
        }
        else {
            bcryptjs_1.default.hash(req.body.password, 10, (err, hase) => {
                var _a;
                if (err) {
                    return res.status(500).json({
                        code: '500',
                        message: err,
                        dafsd: 'dfas'
                    });
                }
                else {
                    const data = new auth_model_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        password: hase,
                        character: req.body.character,
                        phone: req.body.phone,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        userImage: "/userImage/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename),
                        age: req.body.age,
                        satate: req.body.satate,
                        zender: req.body.zender,
                        crreatAt: Date(),
                        lastLogin: "",
                    });
                    data.save().then((result) => {
                        bcryptjs_1.default.compare(req.body.password, hase, (err, logUSer) => {
                            console.log(logUSer);
                            if (err) {
                                return err.status(401).json({
                                    message: 'Anauthorais user'
                                });
                            }
                            if (logUSer) {
                                const token = jsonwebtoken_1.default.sign({
                                    email: req.body.email,
                                    // userId: data._id
                                }, jWT_SECRET, {
                                    expiresIn: '7d'
                                });
                                const resData = {
                                    response: {
                                        user: true,
                                        request: "User Login",
                                        respons: "succses",
                                    },
                                    useData: {
                                        _id: data.id,
                                        username: req.body.username,
                                        email: req.body.email,
                                        character: req.body.character,
                                    },
                                    token: token,
                                    logInTime: new Date(),
                                };
                                return res.status(200).send(resData);
                            }
                            return res.status(401).json({
                                message: 'unauthorais user'
                            });
                        });
                        // console.log(result);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        }
    });
});
route.post('/singin', (req, res, next) => {
    auth_model_1.default.find({
        email: req.body.email
    }).exec().then((result) => {
        console.log("fasdfasdfasd", result);
        if (result.length < 1) {
            return res.status(401).json({
                message: 'Anauthorais user'
            });
        }
        if (!result[0].satate) {
            return res.status(401).json({
                message: "Your Account Blocked",
            });
        }
        bcryptjs_1.default.compare(req.body.password, result[0].password, (err, logUSer) => {
            if (err) {
                return err.status(401).json({
                    message: 'Anauthorais user'
                });
            }
            if (logUSer) {
                const token = jsonwebtoken_1.default.sign({
                    email: result[0].email,
                    userId: result[0]._id
                }, jWT_SECRET, {
                    expiresIn: "7d"
                });
                // tslint:disable-next-line:no-string-literal
                const rData = {
                    _id: result[0]._id,
                    username: result[0].username,
                    email: result[0].email,
                    character: result[0].character,
                    crreatAt: result[0].crreatAt,
                    lastLogin: result[0].lastLogin,
                };
                let data;
                result.forEach((element) => {
                    const obj = new auth_model_1.default({
                        lastLogin: Date()
                    });
                    auth_model_1.default.findByIdAndUpdate({
                        _id: element._id
                    }, {
                        $set: obj
                    }).exec().then((final) => {
                        console.log("FasdfasdfAS", final);
                    }).catch((err) => {
                        console.log(err);
                    });
                    data = {
                        response: {
                            user: true,
                            request: 'User Login',
                            respons: 'succses',
                        },
                        useData: rData,
                        token: token,
                        logInTime: Date()
                    };
                });
                return res.status(200).send(data);
            }
            return res.status(401).json({
                message: 'unauthorais user'
            });
        });
    });
});
route.put("/userUpdate/:id", chackauth_1.default, uplode.single("userImage"), (req, res) => {
    const _id = req.params.id;
    console.log(req.body);
    let obj;
    if (req.file) {
        obj = {
            username: req.body.username,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            userImage: "/userImage/" + req.file.filename,
            state: req.body.state,
            zip: req.body.zip,
            age: req.body.age,
            satate: req.body.satate,
            character: req.body.character,
            zender: req.body.zender,
        };
    }
    else {
        obj = {
            username: req.body.username,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            age: req.body.age,
            satate: req.body.satate,
            character: req.body.character,
            zender: req.body.zender,
        };
    }
    auth_model_1.default
        .findByIdAndUpdate({
        _id: _id,
    }, {
        $set: obj,
    })
        .exec()
        .then((result) => {
        res.status(201).json(result);
    });
});
route.delete("/seller/:id", (req, res) => {
    const id = req.params.id;
    auth_model_1.default
        .remove({
        _id: id,
    })
        .exec()
        .then((result) => {
        res.status(200).json(result);
        console.log(result);
    })
        .catch((err) => {
        res.status(500).json(err.errors);
    });
});
route.use('/varification', email_1.default);
route.use('/forgot', forgotpassword_1.default);
exports.default = route;
//# sourceMappingURL=auth.js.map