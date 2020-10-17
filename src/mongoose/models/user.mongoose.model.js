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
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.SECRET_KEY);
};

// IN: PASSWORD:string =>> OUT: HASH PASSWORD
userSchema.methods.hashPass = async function ({ password }) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// IN: REQUEST PASSWORD: string =>> OUT: VALID: Boolean
userSchema.methods.comparePass = async function(inputPass, userPass){
    return await bcrypt.compare(inputPass, userPass);
}

const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};
