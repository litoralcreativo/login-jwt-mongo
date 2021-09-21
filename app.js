const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

var localStorage = require("local-storage");
const logged = require("./midelwares/auth");

/* CONFIG */
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));

/* ROUTES */
app.get("/user", logged, (req, res) => {
  const user = localStorage("user");
  res.render("home", { user: user });
});
const authRoute = require("./routes/auth");
app.use("/login", authRoute);

app.get("*", (req, res) => {
  res.redirect("login");
});

app.listen(3000, () => console.log("Server en http://localhost:3000"));
