const dotenv = require("dotenv");
dotenv.config();

const verifyUser = (req, res, next) => {
  const userDetail = req.session.userDetail;

  if (!userDetail) {
    let err = new Error();
    err.status = 401;
    err.message = `You're not authenticated`;
    next(err);
  } else {
    req._id = req.session.userDetail.id;
    next();
  }
};

exports.verifyUser = verifyUser;
