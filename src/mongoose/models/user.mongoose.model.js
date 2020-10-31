const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { EMAIL_REGEX } = require("../../constants/regex.const");
const { stringify } = require("querystring");

const userStatus = {
  active: 0,
  deactivate: 1,
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: {
        validator: (email) => {
          let pattern = EMAIL_REGEX;
          return email.length >= 6 && pattern.test(email);
        },
        message: "email must have at least 6 character",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: (password) => {
          return password.length >= 5;
        },
        message: "password must have at least 5 character",
      },
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
    status: {
      type: Number,
      validate: {
        validator: (status) => {
          return Object.values(userStatus).includes(status);
        },
      },
    },
    resetToken: String,
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

userSchema.virtual("userProducts", {
  ref: "product",
  localField: "_id",
  foreignField: "user",
  justOne: false,
  options: {
    sort: { productName: -1 },
  },
});

/*
  Password hash middleware
 */
userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("save", function () {
  this.set({ updatedAt: new Date() });
});

// IN: REQUEST PASSWORD: string =>> OUT: VALID: Boolean
userSchema.methods.comparePass = async function (inputPass, userPass) {
  return await bcrypt.compare(inputPass, userPass);
};

userSchema.methods.hashPassword = async function (enteredPass) {
  let salt = await bcrypt.genSalt(10);
  let res = await bcrypt.hash(enteredPass, salt);
  return res;
};

userSchema.methods.createToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
