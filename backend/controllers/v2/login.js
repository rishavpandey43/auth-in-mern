// import the required dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
};
module.exports = loginController;
