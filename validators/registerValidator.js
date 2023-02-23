import * as Joi from 'joi';
import JoiPhoneNumber from "joi-phone-number";
const PhoneNumber = Joi.extend(JoiPhoneNumber);

const registerValidatorFields = {
    name: Joi.string().min(3).max(100).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"), //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    year_of_tax_filing: Joi.number().required().label("Year of tax filing"),
    phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).required().label("Phone number"),
    alternate_phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).optional().allow('').default('').label("Alternate phone number"),
    do_you_know: Joi.string().valid('1', '2', '3').required().label("do_you_know"),
    referral_user: Joi.when("do_you_know", {
        is: "1",
        then: Joi.string().email().required().label("Referral user's email"),
        otherwise: Joi.string().optional().allow('').default('').label("Referral user's email"),
    }),
    advertisements: Joi.when("do_you_know", {
        is: "2",
        then: Joi.string().required().label("Advertisements"),
        otherwise: Joi.string().optional().allow('').default('').label("Advertisements"),
    }),
    others: Joi.when("do_you_know", {
        is: "3",
        then: Joi.string().required().label("Other"),
        otherwise: Joi.string().optional().allow('').default('').label("Other"),
    }),
    preferred_timezone: Joi.string().valid('CST', 'EST', 'MST', 'PST', 'IST').required().label("Preferred timezone"),
};
const registerValidatorSchema = Joi.object(registerValidatorFields).unknown();

export default registerValidatorSchema;