const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs");
var localStorage = require("local-storage");

const privateKey = fs.readFileSync("./keys/private.pem");
const jwtOptions = {
  algorithm: "RS256",
  expiresIn: 10,
};

const login = async (req, res) => {
  const { email, password: pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const user = await User.findOne({ email: email });
  if (user && user.pass == pass) {
    const token = jwt.sign(
      { user_id: user.id, user_name: user.nombre },
      privateKey,
      jwtOptions
    );

    localStorage("jwt", token);
    localStorage("user", user);
    res.status(200).redirect("/user");
  } else {
    res.status(404).render("login", { msg: "wrong credentials" });
  }
};

router.get("/", (req, res) => {
  res.render("login", { msg: " " });
});
router.post("/", login);

module.exports = router;
