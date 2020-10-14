import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: String,
    lastName: String,
    phoneNumber: String
  },
  role: {
    isAdmin: Boolean,
    required: true
  }
});

userSchema.method.createToken = function({ _id, email }) {
  return jwt.sign({ _id, email }, "JWT_SECRET");
};

userSchema.method.hashPass = async function({ password }) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(password, salt);
  return password;
};

const User = mongoose.model("user", userSchema);

module.exports = {
    User
}