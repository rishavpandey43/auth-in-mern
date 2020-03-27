// import schema model of database
const User1 = require("../../models/user.model.v1");

const getUsernameController = (req, res, next) => {
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
};
module.exports = getUsernameController;
