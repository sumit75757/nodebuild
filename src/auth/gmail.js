"use strict";
const { google } = require("googleapis");
const credentials = require("./cradansial.json");
const { client_secret, client_id, redirect_uri } = credentials.web;
console.log(redirect_uri);
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret);
const GMAIL_SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GMAIL_SCOPES,
});
console.log("Authorize this app by visiting this url:", url);
//# sourceMappingURL=gmail.js.map