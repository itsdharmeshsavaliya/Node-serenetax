import bcrypt from 'bcrypt';
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
import { userValidatorSchema } from "../../validators";
import { commonHelper } from '../../helper';
import { SALT_FACTOR } from '../../config';

const userController = {
    async me(req, res, next) {
        let user;
        try {
            user = await User.fetchById(req.user.user_id);
            if (!user.user_id) return next(CustomErrorHandler.notFound("User not found!"));
        } catch (err) {
            return next(err);
        }
        res.json(user);
    },
    async profile(req, res, next) {
        try {
            let { error } = userValidatorSchema.editProfileValidatorSchema.validate(req.body);
            if (error) return next(error);

            const user_id = req.user.user_id;
            let user = await User.fetchById(user_id);
            if (!user.user_id) return next(CustomErrorHandler.notFound("User not found!"));

            const { email, phone } = req.body;

            let exist = (email === user.email) ? false : await User.isEmailExist(email);
            if (exist) return next(CustomErrorHandler.alreadyExist('Email already exist!'));

            exist = (phone === user.phone) ? false : await User.isPhoneNumberExist(phone);
            if (exist) return next(CustomErrorHandler.alreadyExist('Phone number already exist!'));

            const { login_from } = user;
            const isSaved = await User.saveProfileInfo({
                user_id,
                ...req.body,
                login_from
            });
            if (isSaved) {
                const isEmailChangeRequest = (email !== user.email) ? true : false;
                if (isEmailChangeRequest) {
                    if (login_from != "manually") { //Social Authorized Account/User
                        const social_account_type = commonHelper.ucfirst(login_from);
                        return res.json({ message: `Data saved successful, but you are authorized from ${social_account_type}, so you can't change email!` });
                    }
                }
                return res.json({ message: "Data saved successful." });
            } else {
                return next(CustomErrorHandler.somethingWrong());
            }
        } catch (err) {
            return next(err);
        }
    },
    async changePassword(req, res, next) {
        try {
            let { error } = userValidatorSchema.changePasswordValidatorSchema.validate(req.body);
            if (error) return next(error);

            const user_id = req.user.user_id;
            let user = await User.getPassword(user_id);
            if (!user.user_id) return next(CustomErrorHandler.notFound("User not found!"));

            const { login_from } = user;
            if (login_from !== "manually") { //Social
                let social_account_type = commonHelper.ucfirst(login_from);
                return next(CustomErrorHandler.alreadyExist(`We have recognised that you have already registered using ${social_account_type}, You can't access this functionality!`));
            }

            let { currentPassword, newPassword } = req.body;
            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) return next(CustomErrorHandler.wrongCredentials("Invalid current Password"));

            const salt = await bcrypt.genSalt(parseInt(SALT_FACTOR));
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await User.setNewPassword(user_id, hashedPassword);
            res.json({ message: "Password changed successful." });
        } catch (err) {
            return next(err);
        }
    }
};

export default userController;