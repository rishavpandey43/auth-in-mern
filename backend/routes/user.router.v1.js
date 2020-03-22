/* This router aims to do authentication(signup and login) using basic authentication */

// import the required dependencies
const express = require("express");
const bcrypt = require("bcryptjs");

// import cors for proper cross origin request
const cors = require("../auth/cors");

const User1 = require("../models/user.model.v1");

const userRouterV1 = express.Router();

// Enabling CORS Pre-Flight
userRouterV1.options("*", cors.corsWithOptions, res => {
  res.sendStatus(200);
});

userRouterV1
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
                        message: `${user.email} has been successfully registered`,
                        user: {
                          email: user.email,
                          firstName: user.firstName,
                          lastName: user.lastName
                        }
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
                res.statusCode = 200;
                res.setHeader("WWW-Authenticate", "Basic");
                res.json({
                  user: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                  },
                  message: "You're logged in Successfully"
                });

                // TODO: Can use token, session, cookies so that browser remembers the login of user
              } else {
                res.statusCode = 401;
                res.setHeader("WWW-Authenticate", "Basic");
                res.json({
                  message:
                    "Password entered was incorrect, please try with correct password"
                });
              }
            })
            .catch(err => {
              return next(err);
            });
        }
      })
      .catch(err => next(err));
  });

module.exports = userRouterV1;
