import Joi from 'joi';
import JoiPhoneNumber from "joi-phone-number";
const PhoneNumber = Joi.extend(JoiPhoneNumber);
import CustomErrorHandler from '../services/CustomErrorHandler';

const userIdValidatorFields = {
    user_id: Joi.number().required().error(CustomErrorHandler.unprocessableEntity('Invalid user ID!')),
};
const userIdValidatorSchema = Joi.object(userIdValidatorFields);

const yearValidatorFields = {
    year: Joi.number().required().label("Year of tax filing"),
};
const yearValidatorSchema = Joi.object({...userIdValidatorFields, ...yearValidatorFields }).unknown();

const personalinfoValidatorFields = {
    filing_status_id: Joi.number().required().allow('').default(''),
    fullname: Joi.string().min(3).max(100).required().label("Name"),
    occupation: Joi.string().optional().allow('').default(''),
    email: Joi.string().email().required().label("Email"),
    preferred_timezone: Joi.string().optional().allow('').default(''),
    ssn: Joi.string().optional().allow('').default(''),
    dob: Joi.string().optional().allow('').default(''),
    anniversary_date: Joi.string().optional().allow('').default(''),
    visa_type_id: Joi.number().optional().allow('').default(''),
    first_entry_date: Joi.string().optional().allow('').default(''),
    phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).required().label("Phone number"),
    alternate_phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).required().label("Alternate phone number"),
    indian_phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).optional().allow('').default('').label("Indian phone number"),
    mailing_address: Joi.string().optional().allow('').default(''),
    appartment: Joi.string().optional().allow('').default(''),
    city: Joi.string().optional().allow('').default(''),
    state: Joi.string().optional().allow('').default(''),
    zip: Joi.string().optional().allow('').default(''),
    is_more_employer: Joi.number().required().default('0'),
    employer_info: Joi.string().optional().allow('').default('')
};
const personalinfoValidatorSchema = Joi.object(personalinfoValidatorFields).unknown();

const dependentinfoValidatorFields = {
    fname: Joi.string().required().label("First name"),
    mname: Joi.string().required().label("Middle name"),
    lname: Joi.string().required().label("Last name"),
    dob: Joi.string().required().label("Date of birth"),
    relationship_id: Joi.number().required().label('Relationship'),
    irs_status_id: Joi.number().optional().allow('').default('').label('IRS status'),
    ssn_itin: Joi.string().optional().allow('').default('').label("SSN/ITIN"),
    visa_type_id: Joi.number().optional().allow('').default('').label('Visa type'),
    days_stayed: Joi.number().optional().allow('').default('').label('Days stayed'),
    institution_name: Joi.string().optional().allow('').default('').label('Institution name'),
    institution_tax_id: Joi.string().optional().allow('').default('').label('Institution tax ID'),
    address: Joi.string().optional().allow('').default('').label('Address'),
    apartment: Joi.string().optional().allow('').default('').label('Apartment'),
    city: Joi.string().optional().allow('').default('').label('City'),
    state: Joi.string().optional().allow('').default('').label('State'),
    zip: Joi.number().optional().allow('').default('').label('Zip'),
};
const dependentinfoValidatorSchema = Joi.object(dependentinfoValidatorFields).unknown();

const bankinfoValidatorFields = {
    account_holder_name: Joi.string().required().label("Name of the account holder"),
    bank_name: Joi.string().required().label("Name of the bank"),
    us_bank_routing_number: Joi.string().required().label("Us bank routing number"),
    us_bank_account_number: Joi.string().required().label("Us bank account number"),
    account_type_id: Joi.number().required().label('Type of account').error(CustomErrorHandler.unprocessableEntity('Please select account type!')),
};
const bankinfoValidatorSchema = Joi.object(bankinfoValidatorFields).unknown();

const fbarValidatorFields = {
    ownership: Joi.string().optional().allow('').default(''),
    bank_financial: Joi.string().optional().allow('').default(''),
    street_address: Joi.string().optional().allow('').default(''),
    city: Joi.string().optional().allow('').default(''),
    state: Joi.string().optional().allow('').default(''),
    postal_code: Joi.string().optional().allow('').default(''),
    account_number: Joi.string().optional().allow('').default(''),
    type_of_account: Joi.string().optional().allow('').default(''),
    if_others: Joi.string().optional().allow('').default(''),
    foreign_currency: Joi.string().optional().allow('').default(''),
    income_earned: Joi.string().optional().allow('').default(''),
    total_income_earned: Joi.string().optional().allow('').default(''),
    maximum_value_of_account: Joi.string().optional().allow('').default(''),
    value_of_account: Joi.string().optional().allow('').default(''),
    name_of_joint_owner: Joi.string().optional().allow('').default(''),
};
const fbarValidatorSchema = Joi.object(fbarValidatorFields).unknown();

const changePasswordValidatorFields = {
    currentPassword: Joi.string().required().label("Current password"), //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))    
    newPassword: Joi.string().required().label("New password"),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().label("Confirm password").error(CustomErrorHandler.unprocessableEntity('Confirm password must be same as new password!')),
};
const changePasswordValidatorSchema = Joi.object(changePasswordValidatorFields);

const editProfileValidatorFields = {
    name: Joi.string().min(3).max(100).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    phone: PhoneNumber.string().phoneNumber({ defaultCountry: 'BE', format: 'e164' }).required().label("Phone number"),
};
const editProfileValidatorSchema = Joi.object(editProfileValidatorFields).unknown();

export default {
    userIdValidatorSchema,
    yearValidatorSchema,
    personalinfoValidatorSchema,
    dependentinfoValidatorSchema,
    bankinfoValidatorSchema,
    fbarValidatorSchema,
    changePasswordValidatorSchema,
    editProfileValidatorSchema
};