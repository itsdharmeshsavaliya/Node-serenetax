import * as Joi from 'joi';
const referralUserValidatorFields = {
    referral_user: Joi.string().email().required().label("Referral user email")
};
const referralUserValidatorSchema = Joi.object(referralUserValidatorFields).unknown();

export default referralUserValidatorSchema;