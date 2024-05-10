const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const { registerErrorHandler } = require("../utils/apiHelper");
const {
  generateAccessAndRefreshToken,
  verifyRefreshToken,
  generateAccessToken,
} = require("../utils/token");

async function registerUser(req, res) {
  const _user = req.body;
  try {
    const user = await User.create(_user);
    const token = generateAccessAndRefreshToken(user);
    res.json(token);
  } catch (error) {
    registerErrorHandler(error, res, _user?.email);
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    }).select(["+password"]);

    if (!user) {
      throw new Error("Credentials missing");
    }
    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    if (!isPasswordTheSame) {
      throw new Error("Credentials missing");
    }
    const token = generateAccessAndRefreshToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;

  try {
    const verifiedToken = verifyRefreshToken(refreshToken);
    console.log(verifiedToken);
    const user = await User.findById(verifiedToken?.userId);
    if (!user) {
      throw new Error("User not authorized");
    }
    const newAccessToken = generateAccessToken(user);
    res.json({
      access: newAccessToken,
      refesh: refreshToken,
    });
  } catch (error) {
    console.warn("Error in verifying 'refresh token'", error.message);
    res.status(401).json({
      message: "User not authorized",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
