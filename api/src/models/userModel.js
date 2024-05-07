const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^@]+@[^@]+\.[^@]+$/,
    },
    password: { type: String, required: true, minLength: 8, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password") || user.isNew) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
