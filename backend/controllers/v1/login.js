// import the required dependencies
const bcrypt = require("bcryptjs");

const User1 = require("../../models/user.model.v1");

const loginController = (req, res, next) => {
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
};

module.exports = loginController;
