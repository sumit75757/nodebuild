"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = __importDefault(require("./admin.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import forgot from "./forgotPassword/forgotpassword";
const route = (0, express_1.default)();
require("dotenv").config();
// import email from "./otp/email";
const jWT_SECRET = process.env.JWT_SECRET;
// console.log("dfasdF", jWT_SECRET);
route.post('/singup', (req, res, next) => {
    admin_model_1.default.find({
        email: req.body.email
    }).exec().then((result) => {
        // tslint:disable-next-line: no-console
        console.log(result);
        if (result.length >= 1) {
            return res.status(409).json({
                code: '409',
                message: 'user exist',
            });
        }
        else {
            bcryptjs_1.default.hash(req.body.password, 10, (err, hase) => {
                if (err) {
                    return res.status(500).json({
                        code: '500',
                        message: err,
                    });
                }
                else {
                    console.log(hase);
                    const data = new admin_model_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        character: req.body.character,
                        password: hase,
                        crreatAt: Date(),
                        lastLogin: ''
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
                                        request: 'User Login',
                                        respons: 'succses',
                                    },
                                    useData: {
                                        type: String, required: true,
                                        character: req.body.character,
                                        email: req.body.email,
                                        _id: data.id
                                    },
                                    token: token,
                                    logInTime: new Date()
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
    admin_model_1.default.find({
        email: req.body.email
    }).exec().then((result) => {
        console.log("fasdfasdfasd", result);
        if (result.length < 1) {
            return res.status(401).json({
                message: 'Anauthorais user'
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
                    const obj = new admin_model_1.default({
                        lastLogin: Date()
                    });
                    admin_model_1.default.findByIdAndUpdate({
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
// route.use('/varification' ,email)
// route.use('/forgot' ,forgot)
exports.default = route;
//# sourceMappingURL=admin.js.map