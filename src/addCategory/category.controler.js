"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cat from "./addCat.modal";
// import subcatmoduel from "./subCategory/subCategory.modual";
const addCat_modal_1 = __importDefault(require("./addCat.modal"));
const subCategory_modual_1 = __importDefault(require("././subCategory/subCategory.modual"));
const mongoose_1 = __importDefault(require("mongoose"));
const catagory = {
    getCatagory(req, res) {
        addCat_modal_1.default
            .aggregate([
            {
                $lookup: {
                    from: "subcaetogories",
                    localField: "_id",
                    foreignField: "perent",
                    as: "subcaetogorys",
                },
            },
        ])
            .then((result) => {
            console.log(result);
            let obj = {
                count: result.length,
                response: "sucsess",
                data: result,
            };
            res.status(200).json(obj);
        })
            .catch((err) => {
            console.log("ERROR", err);
        });
    },
    //////getCatogory//////////
    addCatagory(req, res) {
        console.log(req.body);
        const catogory = new addCat_modal_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            catgory: req.body.catgory,
            name: req.body.name,
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
            updateAt: Date(),
        };
        console.log(catogory, id);
        addCat_modal_1.default
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
        addCat_modal_1.default
            .remove({
            _id: id,
        })
            .exec()
            .then((result) => {
            subCategory_modual_1.default.count().then(count => {
                console.log(count, "countsd");
                for (let index = 0; index < count; index++) {
                    subCategory_modual_1.default.findOneAndRemove({ perent: id }).then((ress) => {
                    });
                }
                res.status(200).json(result);
            });
        })
            .catch((err) => {
            res.status(500).json(err.errors);
        });
    },
    // tslint:disable-next-line:no-empty
    getByCatagory(req, res) {
        const id = req.params.id;
        addCat_modal_1.default
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
// function filtera() {}
// // tslint:disable-next-line:no-unused-expression
exports.default = catagory;
//# sourceMappingURL=category.controler.js.map