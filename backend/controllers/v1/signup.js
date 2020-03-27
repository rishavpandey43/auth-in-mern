// import the required dependencies
const bcrypt = require("bcryptjs");

const User1 = require("../../models/user.model.v1");

const signupController = (req, res, next) => {
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
};

module.exports = signupController;
