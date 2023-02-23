import _ from 'underscore';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema } from '../validators';
import { User } from "../models";
import { accountTypeJSON } from '../staticdata';

const bankDetailsController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            const user_id = req.user.user_id;
            const bankInfo = await User.fetchBankInfo(user_id);
            res.json({
                data: { bankInfo, accountTypeInfo: accountTypeJSON }
            });
        } catch (err) {
            return next(err);
        }
    },
    async save(req, res, next) {
        const { error } = userValidatorSchema.bankinfoValidatorSchema.validate(req.body);
        if (error) return next(error);

        let { user_id } = req.user;
        let user;
        try {
            user = await User.fetchById(user_id);
            if (_.isEmpty(user)) return next(CustomErrorHandler.notFound("User not found!"));
        } catch (err) {
            return next(err);
        }

        try {
            const isBankInfoSaved = await User.isBankInfoSaved(user_id);
            const action = (isBankInfoSaved) ? "update" : "insert";
            await User.saveBankInfo({
                user_id,
                ...req.body,
                action
            });
            res.json({ message: "Data saved successful." });
        } catch (err) {
            return next(err);
        }
    }
}
export default bankDetailsController;