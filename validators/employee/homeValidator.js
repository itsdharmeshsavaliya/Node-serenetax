import * as Joi from 'joi';
import JoiPhoneNumber from "joi-phone-number";
const PhoneNumber = Joi.extend(JoiPhoneNumber);

const searchClientValidatorFields = {
    year: Joi.number().required().label("Tax year"),
    name: Joi.string().min(3).max(100).optional().default('').allow('').label("Name"),
    email: Joi.string().email().optional().default('').allow('').label("Email"),
    phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).optional().default('').allow('').label("Phone number"),
    filing_id: Joi.string().optional().default('').allow('').label("File id")
};
const searchClientValidatorSchema = Joi.object(searchClientValidatorFields).unknown();

export default {
    searchClientValidatorSchema
};