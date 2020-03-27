const logoutController = (req, res, next) => {
  if (req.session.userDetail) {
    req.session.destroy();
    res.clearCookie("SESSION_ID");
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "You've been logged in Successfully" });
  } else {
    let err = new Error();
    err.status = 403;
    err.message = `You are not logged in!`;
    next(err);
  }
};
module.exports = logoutController;
