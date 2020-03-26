/* This router aims to do authentication(signup and login) using basic authentication */

// import the required dependencies
const express = require("express");
const bcrypt = require("bcryptjs");

// import cors for proper cross origin request
const cors = require("../utils/cors");

// import controllers
const signupController = require("../controllers/v1/signup");
const loginController = require("../controllers/v1/login");

const userRouterV1 = express.Router();

// Enabling CORS Pre-Flight
userRouterV1.options("*", cors.corsWithOptions, res => {
  res.sendStatus(200);
});

userRouterV1
  .post("/signup", cors.corsWithOptions, signupController)
  .post("/login", cors.corsWithOptions, loginController);

module.exports = userRouterV1;
