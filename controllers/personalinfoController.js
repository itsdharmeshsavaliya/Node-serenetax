import _ from 'underscore';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema } from '../validators';
import { User } from "../models";

import { filingStatusJSON } from '../staticdata';
import { timezonesJSON } from '../staticdata';
import { visaTypeJSON } from '../staticdata';
import { IRSStatusJSON } from '../staticdata';

const personalinfoController = {
    async info(req, res, next) {
        try {
            let { error } = userValidatorSchema.yearValidatorSchema.validate({...req.user, ...req.query });
            if (error) return next(error);

            let user_id = req.user.user_id;
            let user = await User.fetchById(user_id, "all");
            if (_.isEmpty(user)) return next(CustomErrorHandler.unAuthorized("User not found!"));

            const { year } = req.query;
            if (!year) return next(CustomErrorHandler.unprocessableEntity("Please select year!"));

            user.userResidentialAddressInfo = await User.getResidentialAddressInfo(user_id, year, "user");

            user.spouseIdentityInfo = {};
            user.spouseResidentialAddressInfo = [];
            if (user.filing_status_id != 1) { //not 1 means "Single"
                user.spouseIdentityInfo = await User.getSpouseIdentityInfo(user_id);
                user.spouseResidentialAddressInfo = await User.getResidentialAddressInfo(user_id, year, "spouse");
            }

            res.json({
                data: user,
                filingStatusInfo: filingStatusJSON,
                timezonesInfo: timezonesJSON,
                visaTypeInfo: visaTypeJSON,
                IRSStatusInfo: IRSStatusJSON
            });
        } catch (err) {
            return next(err);
        }
    },
    async save(req, res, next) {
        const { error } = userValidatorSchema.personalinfoValidatorSchema.validate(req.body);
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
            await User.saveUserInfo({ user_id, ...req.body });
            await User.saveResidentialAddressInfo({
                user_id,
                residential_address: req.body.user_residential_address,
                action: "user"
            }); //User Residential Address

            let { filing_status_id } = req.body;
            if (filing_status_id != 1) {
                const isSpouseInfoSaved = await User.isSpouseInfoSaved(user_id);
                const action = (isSpouseInfoSaved) ? "update" : "insert";
                await User.saveSpouseInfo({
                    user_id,
                    ...req.body.spouse_identity_info,
                    action
                });
                await User.saveResidentialAddressInfo({
                    user_id,
                    residential_address: req.body.spouse_residential_address,
                    action: "spouse"
                }); //Spouse Residential Address
            }

            res.json({ message: "Data saved successful." });
        } catch (err) {
            return next(err);
        }
    }
}
export default personalinfoController;