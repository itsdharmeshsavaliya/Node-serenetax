import * as Joi from 'joi';
import CustomErrorHandler from '../../services/CustomErrorHandler';

const loginValidatorFields = {
    username: Joi.string().email().required().label("Username").error(CustomErrorHandler.unprocessableEntity('Enter your email!')),
    password: Joi.string().required().label("Password")
};
const employeeLoginValidatorSchema = Joi.object(loginValidatorFields).unknown();

export default employeeLoginValidatorSchema;