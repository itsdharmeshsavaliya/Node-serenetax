import * as Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const loginValidatorFields = {
    login_from: Joi.string().valid('google', 'manually').required().error(CustomErrorHandler.unprocessableEntity('Enter valid credentials!')),
    username: Joi.when("login_from", {
        is: "manually",
        then: Joi.string().email().required().label("Username").error(CustomErrorHandler.unprocessableEntity('Enter your email!')),
        otherwise: Joi.string().optional().allow('').default('').label("Username"),
    }),
    password: Joi.when("login_from", {
        is: "manually",
        then: Joi.string().required().label("Password"), //pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        otherwise: Joi.string().optional().allow('').default('').label("Password"),
    }),
    social_auth_id: Joi.when("login_from", {
        is: "google",
        then: Joi.string().required().label("Auth ID"),
        otherwise: Joi.string().optional().allow('').default('').label("Auth ID"),
    }),
    email: Joi.when("login_from", {
        is: "google",
        then: Joi.string().email().allow('').default('').label("Email"),
        otherwise: Joi.string().optional().allow('').default('').label("Email"),
    }),
    fullname: Joi.when("login_from", {
        is: "google",
        then: Joi.string().allow('').default('').label("Fullname"),
        otherwise: Joi.string().optional().allow('').default('').label("Fullname"),
    }),
};
const loginValidatorSchema = Joi.object(loginValidatorFields).unknown();

export default loginValidatorSchema;