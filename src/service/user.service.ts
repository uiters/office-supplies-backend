import { USER_STATUS } from '../models/user.model';
import { UserModel } from '../mongoose/user.mongoose';
import { AuthRequest, IPopulate } from '../types/utils';
import SendEmailService, { IMailOptions } from '../service/utils/sendEmail.service';
import jwt from 'jsonwebtoken';
import { PAGINATE } from '../constants/paginate.const';

const transporter = new SendEmailService();

export default class UserService {
    public async createUser(data: any, options: any, req: AuthRequest) {
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
            console.log(error);
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

    public async getUser(page: number = 1) {
        const skip = (page - 1) * PAGINATE.PAGE_SIZE;
        const user = await UserModel.find().skip(skip).limit(PAGINATE.PAGE_SIZE);
        const pageCount = Math.ceil((await UserModel.countDocuments()) / PAGINATE.PAGE_SIZE);
        const hasNext = page < pageCount;
        return {
            user,
            pageCount,
            hasNext,
        };
    }

    public async verifyUser(emailToken: string) {
        const user = await UserModel.findOne({ emailVerifiedToken: emailToken });
        if (!user) return null;
        user.status = 1;
        user.emailVerifiedToken = '';
        const updatedUser = await user.save();
        return updatedUser;
    }

    public async forgotPassword(email: string, req: AuthRequest) {
        const user = await UserModel.findOne({ email });
        if (!user) return null;

        const resetPasswordToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_SECRET, {
            expiresIn: process.env.JWT_RESET_EXPIRES,
        });

        const mailOptions: IMailOptions = {
            toEmail: email,
            subject: 'Reset password',
            text: 'reset',
            html: `<p>You requested for reset Password</p>
            <h3>click in this link: http://${req.headers.host}/api/user/reset-password/${resetPasswordToken} to reset your password</h3>`,
        };

        transporter.createMailOptions(mailOptions);

        const result = await transporter.sendMail();

        if (result) {
            user.passwordResetToken = resetPasswordToken;
            const reset = await user.save();
            return reset;
        } else {
            return null;
        }
    }
    public async resetPassword(token: string) {
        const user = await UserModel.findOne({ passwordResetToken: token });
        if (!user) return null;
        user.password = process.env.RESET_PASSWORD;
        user.passwordResetToken = '';

        const mailOptions: IMailOptions = {
            toEmail: user.email,
            subject: 'Reset password',
            text: 'reset',
            html: `<p>You requested for reset Password</p>
            <h3>Your current password has been reset to ${process.env.RESET_PASSWORD}</h3>
            <h4>Please change this password!</h4>`,
        };

        transporter.createMailOptions(mailOptions);
        const result = await transporter.sendMail();
        if (result) {
            const updatedUser = await user.save();
            return updatedUser;
        } else return null;
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
