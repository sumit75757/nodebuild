"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subCategory_modual_1 = __importDefault(require("../subCategory/subCategory.modual"));
const mongoose_1 = __importDefault(require("mongoose"));
const subCategory = {
    getCatagory(req, res) {
        subCategory_modual_1.default
            .find()
            .exec()
            .then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    code: "404",
                    massage: "Not Found",
                });
            }
        })
            .catch((err) => {
            console.log("ERROR", err);
        });
    },
    //////getCatogory//////////
    addCatagory(req, res) {
        console.log(req.body);
        const catogory = new subCategory_modual_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            catgory: req.body.catgory,
            name: req.body.name,
            perent: new mongoose_1.default.Types.ObjectId(req.body.perent),
            crreatAt: Date(),
        });
        catogory
            .save()
            .then((result) => {
            res.status(201).json(result);
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    },
    updateCatagory(req, res) {
        const id = req.params.id;
        const catogory = {
            catgory: req.body.catgory,
            name: req.body.name,
            perent: req.body.perent,
            updateAt: Date(),
        };
        console.log(catogory, id);
        subCategory_modual_1.default
            .findOneAndUpdate({
            _id: id,
        }, {
            $set: catogory,
        })
            .exec()
            .then((result) => {
            if (result) {
                const returnData = {
                    status: true,
                    time: Date(),
                    message: "Data updated",
                    data: result,
                };
                res.status(200).json(returnData);
            }
            else {
                res.json({
                    massage: "Some thing wrong ",
                });
            }
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
    removeCatagory(req, res) {
        console.log(req.body);
        const id = req.params.id;
        console.log(id);
        subCategory_modual_1.default
            .remove({
            _id: id,
        })
            .exec()
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
    // tslint:disable-next-line:no-empty
    getByCatagory(req, res) {
        const id = req.params.id;
        subCategory_modual_1.default
            .findById(id)
            .exec()
            .then((result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    code: "404",
                    massage: "Not Found",
                });
            }
        })
            .catch((err) => {
            console.log("ERROR", err);
        });
    },
};
exports.default = subCategory;
//# sourceMappingURL=subCategory.controller.js.map