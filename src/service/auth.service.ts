import { UserModel } from '../mongoose/user.mongoose';

export class AuthService {
    public async login(email: string) {
        const user = await UserModel.findOne({ email });
        if (!user) return null;
        const token = user.createToken();
        return token;
    }
}
