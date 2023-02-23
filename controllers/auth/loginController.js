import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { loginValidatorSchema, refreshTokenValidatorSchema } from '../../validators';
import { REFRESH_SECRET } from '../../config';
import { User, RefreshToken } from "../../models";
import { commonHelper } from '../../helper';

const loginController = {
    async login(req, res, next) {
        try {
            const { error } = loginValidatorSchema.validate(req.body);
            if (error) return next(error);

            let { login_from, username, password, social_auth_id, email } = req.body;
            let user_id = "";
            if (login_from === "manually") { // manually
                const user = await User.fetch(username, "both");
                if (!user.user_id) return next(CustomErrorHandler.wrongCredentials());

                let social_account_type = user.login_from;
                if (social_account_type != "manually") { //Social
                    social_account_type = commonHelper.ucfirst(user.login_from);
                    return next(CustomErrorHandler.alreadyExist(`We have recognised that you have already registered using ${social_account_type}, Please use social login to continue!`));
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) return next(CustomErrorHandler.wrongCredentials());

                user_id = user.user_id;
            } else { //social login
                user_id = await User.socialAuth(login_from, social_auth_id);
                if (user_id == "") {
                    if (email != "") {
                        const exist = await User.isEmailExist(email);
                        if (exist) return next(CustomErrorHandler.alreadyExist('Email already exists, Please use your ID and Password to continue or Try resetting your password!'));
                    }
                    user_id = await User.createSocial(req.body);
                    await User.setFilingID(user_id);
                }
            }

            let user = await User.fetchById(user_id);
            if (!user.user_id) return next(CustomErrorHandler.wrongCredentials());

            const access_token = JwtService.sign({ user_id: user.user_id });
            const refresh_token = JwtService.sign({ user_id: user.user_id }, '1y', REFRESH_SECRET);
            await RefreshToken.create({ token: refresh_token });

            res.json({ data: user, access_token, refresh_token });
        } catch (err) {
            return next(err);
        }
    },
    async logout(req, res, next) {
        const { error } = refreshTokenValidatorSchema.validate(req.body);
        if (error) return next(error);

        const { refresh_token } = req.body;
        try {
            await RefreshToken.delete({ token: refresh_token });
        } catch (err) {
            return next(new Error('Something went wrong, please try again!'));
        }
        res.json({ message: "Logout successful" });
    }
};

export default loginController;