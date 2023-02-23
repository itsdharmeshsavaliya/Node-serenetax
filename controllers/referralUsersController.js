import _ from 'underscore';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema, referralUserValidatorSchema } from '../validators';
import { User } from "../models";

const referralUsersController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            let user_id = req.user.user_id;
            const referralUsers = await User.fetchReferralUsers(user_id);
            res.json({ data: referralUsers });
        } catch (err) {
            return next(err);
        }
    },
    async save(req, res, next) {
        try {
            const { error } = referralUserValidatorSchema.validate(req.body);
            if (error) return next(error);

            let { user_id } = req.user;
            let user = await User.fetchById(user_id);
            if (_.isEmpty(user)) return next(CustomErrorHandler.unAuthorized("User not found!"));

            const { email } = user;
            const { referral_user } = req.body;
            console.log(email, referral_user);
            if (email == referral_user) return next(CustomErrorHandler.somethingWrong('You can not add your email as referral user!'));

            let ref_user = await User.fetchByEmail(referral_user);
            if (_.isEmpty(ref_user)) return next(CustomErrorHandler.notFound('Referral user not exist!'));

            const isAlreadyReferralUser = await User.isAlreadyReferralUser(user_id, ref_user.user_id);
            if (isAlreadyReferralUser) return next(CustomErrorHandler.alreadyExist('Referral user is already added to your account!'));

            await User.saveReferralUser(user_id, ref_user.user_id);
            await User.updateWalletBalance(ref_user.user_id, 20); //Add $20 to referral user

            res.json({ message: "Referral user added successful." });
        } catch (err) {
            return next(err);
        }
    }
}
export default referralUsersController;