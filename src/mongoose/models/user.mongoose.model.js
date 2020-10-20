const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {Schema} = mongoose;

const userStatus = {
    'active': 0,
    'deactive': 1,
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6
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
                    return Object.values(userStatus).includes(status)
                }
            }
        }
    },
    {toJSON: {virtuals: true}, timestamps: true}
);

userSchema.virtual('userProducts', {
    ref: 'product',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    options: {
        sort: {productName: -1}
    }
})

/*
  Password has middleware
 */
userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// IN: REQUEST PASSWORD: string =>> OUT: VALID: Boolean
userSchema.methods.comparePass = async function (inputPass, userPass) {
    return await bcrypt.compare(inputPass, userPass);
}

userSchema.methods.createToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.SECRET_KEY);
};



// Virtual
// userSchema.virtual('fullName').get(function () {
//     return `${this.profile.firstName} ${this.profile.lastName}`;
// })


const User = mongoose.model("user", userSchema);

module.exports = {
    User,
};
