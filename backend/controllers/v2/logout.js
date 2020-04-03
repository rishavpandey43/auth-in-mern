const logoutController = (req, res, next) => {
  res
    .status(200)
    .clearCookie("token")
    .json({ message: "You've been logged in Successfully" });
};
module.exports = logoutController;
