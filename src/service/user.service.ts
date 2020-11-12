import { NextFunction, Response } from 'express';
import { IUser, USER_STATUS } from '../models/user.model';
import { UserModel } from '../mongoose/user.mongoose';
import { AuthRequest, IPopulate } from '../types/utils';
import SendEmailService, { IMailOptions } from '../service/utils/sendEmail.service';

const transporter = new SendEmailService();

export default class UserService {
    public async createUser(data: any, options = {}, req: AuthRequest) {
        try {
            const mailOptions: IMailOptions = {
                toEmail: data.email,
                subject: 'Email verification',
                text: 'Activate account',
                html: `<p>You requested for Activate email</p>
                <h3>click in this http://${req.headers.host}/api/user/email-verification/${data.emailVerifiedToken} to activate your account</h3>`,
            };

            transporter.createMailOptions(mailOptions);

            transporter.sendMail().then((result) => {
                console.log(result);
            });

            const newUser = new UserModel(data);

            const doc = await newUser.save();

            return doc;
        } catch (error) {
            console.log(error)
        }
    }
    public async getMe(id: string) {
        const user = await UserModel.findById(id);
        return user;
    }

    public async deleteUser(id: string) {
        const user = await UserModel.findByIdAndDelete(id);
        return user;
    }

    public async updateUser(id: string, data: IUpdateUser) {
        const user = await UserModel.findById(id);
        if (!user) return null;

        if (data.password !== undefined) user.password = data.password;
        if (data.profile !== undefined) user.profile = data.profile;
        if (data.status !== undefined) user.status = data.status;

        const updatedUser = await user.save();
        return updatedUser;
    }

    public async getUserById(id: string) {
        const user = await UserModel.findById(id);
        return user;
    }

    public async verifyUser(emailToken: string) {
        const user = await UserModel.findOne({ emailVerifiedToken: emailToken });
        user.status = 1;
        user.emailVerifiedToken = '';
        const updatedUser = await user.save();
        return user;
    }
}

interface IUpdateUser {
    password: string;
    profile: {
        fullName: string;
        phoneNumber: string;
    };
    status: USER_STATUS;
}
