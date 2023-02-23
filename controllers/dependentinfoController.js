import _ from 'underscore';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema } from '../validators';
import { User } from "../models";
import { relationshipJSON, IRSStatusJSON, visaTypeJSON } from '../staticdata';

const dependentinfoController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.yearValidatorSchema.validate({...req.user, ...req.query });
            if (error) return next(error);

            const user_id = req.user.user_id;
            const dependentInfo = await User.fetchDependentInfo(user_id);

            const { year } = req.query;
            if (!year) return next(CustomErrorHandler.unprocessableEntity("Please select year!"));

            const dependentResidentialAddressInfo = await User.getResidentialAddressInfo(user_id, year, "dependent");
            res.json({
                data: {
                    dependentInfo,
                    dependentResidentialAddressInfo,
                    relationshipInfo: relationshipJSON,
                    IRSStatusInfo: IRSStatusJSON,
                    visaTypeInfo: visaTypeJSON
                },
            });
        } catch (err) {
            return next(err);
        }
    },
    async save(req, res, next) {
        const { error } = userValidatorSchema.dependentinfoValidatorSchema.validate(req.body);
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
            const isDependentInfoSaved = await User.isDependentInfoSaved(user_id);
            const action = (isDependentInfoSaved) ? "update" : "insert";
            await User.saveDependentInfo({
                user_id,
                ...req.body,
                action
            });
            await User.saveResidentialAddressInfo({
                user_id,
                residential_address: req.body.residential_address,
                action: "dependent"
            }); //Residential Address        

            res.json({ message: "Data saved successful." });
        } catch (err) {
            return next(err);
        }
    }
}
export default dependentinfoController;