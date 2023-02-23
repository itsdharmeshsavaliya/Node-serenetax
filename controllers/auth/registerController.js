import _ from 'underscore';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { registerValidatorSchema } from '../../validators';
import { REFRESH_SECRET, SALT_FACTOR } from '../../config';
import { User, RefreshToken } from "../../models";
import { commonHelper } from '../../helper';

import { aboutTaxFilerJSON } from '../../staticdata';
import { timezonesJSON } from '../../staticdata';

const registerController = {
    async info(req, res, next) {
        try {
            res.json({
                aboutTaxFilerInfo: aboutTaxFilerJSON,
                timezonesInfo: timezonesJSON
            });
        } catch (err) {
            return next(err);
        }
    },
    async register(req, res, next) {
        try {
            const { error } = registerValidatorSchema.validate(req.body);
            if (error) return next(error);

            let auth_user = await User.fetchByEmail(req.body.email);
            if (!_.isEmpty(auth_user)) {
                let social_account_type = auth_user.login_from;
                if (social_account_type == "manually") {
                    return next(CustomErrorHandler.alreadyExist('Email already exist!'));
                } else { //Social
                    social_account_type = commonHelper.ucfirst(auth_user.login_from);
                    return next(CustomErrorHandler.alreadyExist(`We have recognised that you have already registered using ${social_account_type}, Please use social login to continue!`));
                }
            }

            let exist = await User.isPhoneNumberExist(req.body.phone);
            if (exist) return next(CustomErrorHandler.alreadyExist('Phone number already exist!'));

            if (req.body.alternate_phone) {
                exist = await User.isPhoneNumberExist(req.body.alternate_phone);
                if (exist) return next(CustomErrorHandler.alreadyExist('Alternate phone number already exist!'));
            }

            const { do_you_know } = req.body;
            if (do_you_know == 1) { //Referral
                const { referral_user } = req.body;
                if (req.body.email == referral_user) return next(CustomErrorHandler.somethingWrong('You can not add your email as referral user!'));

                let ref_user = await User.fetchByEmail(referral_user);
                if (_.isEmpty(ref_user)) return next(CustomErrorHandler.notFound('Referral user not exist!'));

                req.body.referral_user_id = ref_user.user_id;
            }

            let { password } = req.body;
            const salt = await bcrypt.genSalt(parseInt(SALT_FACTOR));
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;

            let access_token, refresh_token, user;
            const user_id = await User.create(req.body);
            await User.setFilingID(user_id);

            //Save Referral User
            const { referral_user_id } = req.body;
            if (do_you_know == 1 && referral_user_id) {
                await User.saveReferralUser(user_id, referral_user_id, "register");
                await User.updateWalletBalance(referral_user_id, 20); //Add $20 to referral user
            }

            user = await User.fetchById(user_id);
            if (!user.user_id) return next(CustomErrorHandler.somethingWrong());

            access_token = JwtService.sign({ user_id: user.user_id });
            refresh_token = JwtService.sign({ user_id: user.user_id }, '1y', REFRESH_SECRET);
            await RefreshToken.create({ token: refresh_token });
            res.json({ data: user, access_token, refresh_token });
        } catch (err) {
            return next(err);
        }
    }
}
export default registerController;