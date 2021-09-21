const fs = require("fs");
const publicKey = fs.readFileSync("./keys/public.pem");
const jwt = require("jsonwebtoken");
var localStorage = require("local-storage");

const logged = (req, res, next) => {
  try {
    const authorization = localStorage("jwt");
    const response = jwt.verify(authorization, publicKey);
    next();
  } catch (e) {
    res.render("login", { msg: "session expirada" });
  }
};

module.exports = logged;
