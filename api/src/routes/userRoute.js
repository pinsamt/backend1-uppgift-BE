const Express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
} = require("../controllers/user.controller");

const userRouter = Express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh", refreshAccessToken);

module.exports = userRouter;
