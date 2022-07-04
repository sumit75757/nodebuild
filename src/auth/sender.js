"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendMail = require("./gmail.sender");
// import sendMail from "./gmail.sender";
const main = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //   const fileAttachments = [
    //     {
    //       filename: "attachment1.txt",
    //       content: "This is a plain text file sent as an attachment",
    //     },
    //     {
    //       path: path.join(__dirname, "./attachment2.txt"),
    //     },
    //     {
    //       filename: "websites.pdf",
    //       path: "https://www.labnol.org/files/cool-websites.pdf",
    //     },
    //     {
    //       filename: "image.png",
    //       content: fs.createReadStream(path.join(__dirname, "./attach.png")),
    //     },
    //   ];
    // from: process.env.GMAIL,
    //           to: req.body.email,
    //           subject: +"otp is" + otp,
    //           text: otp,
    //           // amp: '',
    //           html: html,
    const options = {
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        // attachments: fileAttachments,
        textEncoding: "base64",
        headers: [{
                key: "X-Application-Developer",
                value: "Amit Agarwal"
            },
            {
                key: "X-Application-Version",
                value: "v1.0.0.2"
            },
        ],
    };
    const messageId = yield sendMail(options);
    return messageId;
});
exports.default = main;
//# sourceMappingURL=sender.js.map