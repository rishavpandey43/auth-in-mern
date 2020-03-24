const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyUser = (req, res, next) => {
  const token = req.signedCookies.token || req.body.token || req.query.token;
  if (!token) {
    let err = new Error();
    err.status = 401;
    err.message = `No token provided`;
    next(err);
  } else {
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
      if (err) {
        let err = new Error();
        err.status = 401;
        err.message = `Token is invalid`;
        next(err);
      } else {
        req._id = data.userId;
        next();
      }
    });
  }
};

const authenticate1 = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    let err = new Error();
    err.status = 401;
    err.message = `No token provided`;
    next(err);
  } else {
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
      if (err) {
        next(err);
      } else {
        req.userId = data.userId;
        next();
      }
    });
  }
};

exports.verifyUser = verifyUser;
