import _ from 'underscore';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema } from '../validators';
import { User } from "../models";
import { documentTypeJSON } from '../staticdata';

const fbarController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            const user_id = req.user.user_id;
            const fbarInfo = await User.fetchFbarInfo(user_id);
            res.json({
                data: { fbarInfo, documentTypeInfo: documentTypeJSON },
            });
        } catch (err) {
            return next(err);
        }
    },
    async save(req, res, next) {
        const { error } = userValidatorSchema.fbarValidatorSchema.validate(req.body);
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
            const isFbarInfoSaved = await User.isFbarInfoSaved(user_id);
            const action = (isFbarInfoSaved) ? "update" : "insert";
            await User.saveFbarInfo({
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
export default fbarController;