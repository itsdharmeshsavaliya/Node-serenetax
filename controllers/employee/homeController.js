// import CustomErrorHandler from '../../services/CustomErrorHandler';
import { searchClientValidatorSchema } from '../../validators';
// import { Employee } from "../../models";

const employeeHomeController = {
    async searchclient(req, res, next) {
        try {
            // const { error } = searchClientValidatorSchema.validate(req.body);
            // if (error) return next(error);

            res.json({ payload: req.body });
        } catch (err) {
            return next(err);
        }
    },
};

export default employeeHomeController;