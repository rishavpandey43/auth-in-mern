const User1 = require("../../models/user.model.v1");

const userDetailController = (req, res, next) => {
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
};
module.exports = userDetailController;
