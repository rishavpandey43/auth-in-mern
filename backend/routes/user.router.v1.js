/* This router aims to do authentication(signup and login) using basic authentication */

// import the required dependencies
const express = require("express");

// import cors for proper cross origin request
const cors = require("../auth/cors");

const userRouterV1 = express.Router();

// Enabling CORS Pre-Flight
userRouterV1.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

userRouterV1.get("/", cors.cors, (req, res) => {
  res.send("Hello World2!");
});

module.exports = userRouterV1;
