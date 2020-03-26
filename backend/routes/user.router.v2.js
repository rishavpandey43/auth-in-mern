/* This router aims to do authentication(signup and login) using basic authentication */

// import the required dependencies
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import cors for proper cross origin request
const cors = require("../utils/cors");
const { verifyUserToken } = require("../utils/tokenAuth");

// import schema model of database
const User1 = require("../models/user.model.v1");

const userRouterV2 = express.Router();

// Enabling CORS Pre-Flight
userRouterV2.options("*", cors.corsWithOptions, res => {
  res.sendStatus(200);
});

userRouterV2
  .get(
    "/get-username",
    cors.corsWithOptions,
    verifyUserToken,
    (req, res, next) => {
      User1.findOne({ _id: req._id })
        .then(user => {
          res.statusCode = 200;
          res.setHeader("WWW-Authenticate", "Basic");
          res.json({
            user: {
              username: user.username
            }
          });
        })
        .catch(err => {
          next(err);
        });
    }
  )
  .get(
    "/user-detail",
    cors.corsWithOptions,
    verifyUserToken,
    (req, res, next) => {
      User1.findOne({ _id: req._id })
        .then(user => {
          res.statusCode = 200;
          res.setHeader("WWW-Authenticate", "Basic");
          res.json({
            user: {
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
            }
          });
        })
        .catch(err => {
          next(err);
        });
    }
  )
  .post("/signup", cors.corsWithOptions, (req, res, next) => {
    User1.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          let err = new Error();
          err.status = 403;
          err.message = `username ${req.body.username} is not available, please try again with another username`;
          next(err);
        }
      })
      .catch(err => next(err));
    User1.findOne({ email: req.body.email }).then(user => {
      if (user) {
        let err = new Error();
        err.status = 403;
        err.message = `Email ${req.body.email} is already registered, please try again with another email`;
        next(err);
      } else {
        bcrypt
          .genSalt(10)
          .then(salt => {
            bcrypt
              .hash(req.body.password, salt)
              .then(hashPassword => {
                User1.create({
                  username: req.body.username,
                  email: req.body.email,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  password: hashPassword
                })
                  .then(
                    user => {
                      res.statusCode = 200;
                      res.setHeader("WWW-Authenticate", "Basic");
                      res.json({
                        message: `${user.email} has been successfully registered`
                      });
                    },
                    err => next(err)
                  )
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      }
    });
  })
  .post("/login", cors.corsWithOptions, (req, res, next) => {
    User1.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          let err = new Error();
          err.status = 404;
          err.message = `Email ${req.body.email} is not registered, please signup with this email to continue`;
          next(err);
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then(validPassword => {
              if (validPassword) {
                // Issue JWT Token on validation
                const token = jwt.sign(
                  { userId: user._id },
                  process.env.JWT_SECRET_KEY,
                  {
                    expiresIn: 90000
                  }
                );
                res.statusCode = 200;
                res.cookie("token", token, {
                  expires: new Date(Date.now() + 90000),
                  httpOnly: true,
                  signed: true
                });
                res.json({
                  token,
                  message: "You're logged in Successfully"
                });
              } else {
                let err = new Error();
                err.status = 401;
                err.message = `Password entered was incorrect, please try with correct password`;
                next(err);
              }
            })
            .catch(err => {
              return next(err);
            });
        }
      })
      .catch(err => next(err));
  })
  .get("/logout", cors.corsWithOptions, verifyUserToken, (req, res, next) => {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "You've been logged in Successfully" });
  });

module.exports = userRouterV2;
