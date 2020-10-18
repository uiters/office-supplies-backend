const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userStatus = {
   'active': 0,
    'deactive': 1,
}

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
        address: {
            city: String,
            district: String,
            street: String
        }
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    status: {
        type: Number,
        validate: {
            validator: (status) => {
                return Object.values(userStatus).includes(status)
            }
        }
    }

});

/*
  Password has middleware
 */
userSchema.pre('save', async function(next){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// IN: REQUEST PASSWORD: string =>> OUT: VALID: Boolean
userSchema.methods.comparePass = async function(inputPass, userPass){
    return await bcrypt.compare(inputPass, userPass);
}

// Virtual
userSchema.virtual('fullName').get(function(){
    return `${this.profile.firstName} ${this.profile.lastName}`;
})

const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};
