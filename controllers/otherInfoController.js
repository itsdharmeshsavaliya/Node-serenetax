import _ from 'underscore';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { userValidatorSchema, otherInfoValidatorSchema } from '../validators';
import { OtherInfo } from "../models";

const otherInfoController = {
    async otherIncomeInfo(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            let { user_id } = req.user;
            const { year } = req.query;
            if (!year) return next(CustomErrorHandler.unprocessableEntity("Please select year!"));

            const otherIncomeInfo = await OtherInfo.fetchOtherIncomeInfo(user_id, year);
            res.json({ data: { otherIncomeInfo } });
        } catch (err) {
            return next(err);
        }
    },
    async otherIncomeSave(req, res, next) {
        try {
            const { error } = otherInfoValidatorSchema.otherIncomeValidatorSchema.validate(req.body);
            if (error) return next(error);

            let { user_id } = req.user;
            const { year } = req.body;
            const info = await OtherInfo.fetchOtherIncomeInfo(user_id, year);
            const action = (_.isEmpty(info)) ? "insert" : "update";
            await OtherInfo.saveOtherIncomeInfo({
                user_id,
                ...req.body,
                action
            });
            res.json({ message: "Data saved successful." });
        } catch (err) {
            return next(err);
        }
    },
    async expensesInfo(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            let { user_id } = req.user;
            const { year } = req.query;
            if (!year) return next(CustomErrorHandler.unprocessableEntity("Please select year!"));

            const expensesInfo = await OtherInfo.fetchExpensesInfo(user_id, year);
            res.json({ data: { expensesInfo } });
        } catch (err) {
            return next(err);
        }
    },
    async expensesSave(req, res, next) {
        try {
            const { error } = otherInfoValidatorSchema.expensesValidatorSchema.validate(req.body);
            if (error) return next(error);

            let { user_id } = req.user;
            const { year } = req.body;
            const info = await OtherInfo.fetchExpensesInfo(user_id, year);
            const action = (_.isEmpty(info)) ? "insert" : "update";
            await OtherInfo.saveExpensesInfo({
                user_id,
                ...req.body,
                action
            });
            res.json({ message: "Data saved successful." });
        } catch (err) {
            return next(err);
        }
    },
    async rentalIncomeInfo(req, res, next) {
        try {
            let { error } = userValidatorSchema.userIdValidatorSchema.validate(req.user);
            if (error) return next(error);

            let { user_id } = req.user;
            const { year } = req.query;
            if (!year) return next(CustomErrorHandler.unprocessableEntity("Please select year!"));

            const rentalIncomeInfo = await OtherInfo.fetchRentalIncomeInfo(user_id, year);
            res.json({ data: { rentalIncomeInfo } });
        } catch (err) {
            return next(err);
        }
    },
    async rentalIncomeSave(req, res, next) {
        try {
            const { error } = otherInfoValidatorSchema.rentalIncomeValidatorSchema.validate(req.body);
            if (error) return next(error);

            let { user_id } = req.user;
            const { year } = req.body;
            const info = await OtherInfo.fetchRentalIncomeInfo(user_id, year);
            const action = (_.isEmpty(info)) ? "insert" : "update";
            await OtherInfo.saveRentalIncomeInfo({
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
export default otherInfoController;