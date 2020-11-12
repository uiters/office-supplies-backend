import mongoose from 'mongoose';

export enum USER_STATUS {
    ACTIVATE = 1,
    DEACTIVATE = 0,
}
export interface IUser extends mongoose.Document, IUserMethods {
    // _id?: mongoose.Types.ObjectId;
    email: string;
    emailVerifiedToken?: string;
    emailVerifiedExpires?: Date;
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
    password: string;
    profile: {
        fullName: string;
        phoneNumber: string;
    };
    status: USER_STATUS;
    isAdmin: boolean;
}

export interface IUserMethods {
    createToken: () => string;
    comparePassword: comparePasswordFunction;
}

export type comparePasswordFunction = (
    candidatePassword: string,
    cb: (err: any, isMatch: boolean) => void
) => void;
