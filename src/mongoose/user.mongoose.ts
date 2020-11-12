import mongoose from 'mongoose';
import { comparePasswordFunction, IUser, USER_STATUS } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailVerifiedToken: String,
        emailVerifiedTokenExpires: Date,
        password: {
            type: String,
            required: true,
        },
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
        profile: {
            fullName: String,
            phoneNumber: String,
        },
        status: {
            type: USER_STATUS,
            validate: {
                validator: (status: USER_STATUS) => {
                    return Object.values(USER_STATUS).includes(status);
                },
            },
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function save(next) {
    const user = this as IUser;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    next();
});

const comparePassword: comparePasswordFunction = function (candidatePassword: string, cb: any) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods = {
    createToken() {
        return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });
    },
    comparePassword,
};

export const UserModel = mongoose.model<IUser>('user', userSchema);
