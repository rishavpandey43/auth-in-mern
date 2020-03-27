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
              req.session.userDetail = {
                id: user._id,
                status: "authenticated"
              };
              res.statusCode = 200;
              res.json({
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
