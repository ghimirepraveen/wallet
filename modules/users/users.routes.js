const express = require("express");
const userRegister = require("./controllers/userRegister");
const userlogin = require("./controllers/userlogin.js");
const userDashboard = require("./controllers/userdasboard");
const auth = require("../../handler/middlewares/auth");
const user_Router = express.Router();

user_Router.post("/register", userRegister);
user_Router.post("/login", userlogin);

//protected route
user_Router.use(auth);
user_Router.get("/dashboard", userDashboard);
module.exports = user_Router;
