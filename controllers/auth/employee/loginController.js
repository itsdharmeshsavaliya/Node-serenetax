import bcrypt from 'bcrypt';
import JwtService from '../../../services/JwtService';
import CustomErrorHandler from '../../../services/CustomErrorHandler';
import { employeeLoginValidatorSchema, refreshTokenValidatorSchema } from '../../../validators';
import { REFRESH_SECRET } from '../../../config';
import { Employee, RefreshToken } from "../../../models";

const employeeLoginController = {
    async login(req, res, next) {
        try {
            const { error } = employeeLoginValidatorSchema.validate(req.body);
            if (error) return next(error);

            let { username, password } = req.body;

            let employee = await Employee.fetch(username);
            if (!employee.employee_id) return next(CustomErrorHandler.wrongCredentials());

            const match = await bcrypt.compare(password, employee.password);
            if (!match) return next(CustomErrorHandler.wrongCredentials());

            let employee_id = employee.employee_id;
            employee = await Employee.fetchById(employee_id);
            if (!employee.employee_id) return next(CustomErrorHandler.wrongCredentials());

            const access_token = JwtService.sign({ employee_id: employee.employee_id });
            const refresh_token = JwtService.sign({ employee_id: employee.employee_id }, '1y', REFRESH_SECRET);
            await RefreshToken.create({ token: refresh_token });

            res.json({ data: employee, access_token, refresh_token });
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

export default employeeLoginController;