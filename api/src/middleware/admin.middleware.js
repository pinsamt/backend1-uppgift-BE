function isAdminMiddleware(req, res, next) {
  const User = require("../models/userModel");

  User.findById(req.userId)
    .then((user) => {
      if (!user || !user.isAdmin) {
        return res.status(403).json({
          message: "User is not an admin",
        });
      }
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    });
}

module.exports = isAdminMiddleware;
