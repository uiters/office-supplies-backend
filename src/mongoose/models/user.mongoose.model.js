const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        firstName: String,
        lastName: String,
        phoneNumber: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
});

userSchema.methods.createToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, "JWT_SECRET");
};

userSchema.methods.hashPass = async function ({ password }) {
    let salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
};

userSchema.methods.comparePass = async function(inputPass, userPass){
  const valid = await bcrypt.compare(inputPass, userPass);
  return valid;
}

const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};
