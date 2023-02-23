import Joi from 'joi';

const OtherIncomeValidatorFields = {
    year: Joi.number().required().label('Year'),
    interest_dividend: Joi.number().required().default('0'),
    business_income: Joi.number().required().default('0'),
    sold_stocks: Joi.number().required().default('0'),
    sold_espp: Joi.number().required().default('0'),
    rental_income: Joi.number().required().default('0'),
    earned_interest: Joi.number().required().default('0'),
    draw_money_hsa: Joi.number().required().default('0'),
    draw_money_ira: Joi.number().required().default('0'),
    received_refund: Joi.number().required().default('0'),
    received_compensation: Joi.number().required().default('0'),
    income_or_losses: Joi.number().required().default('0'),
    received_third_party_payment: Joi.number().required().default('0'),
};
const otherIncomeValidatorSchema = Joi.object(OtherIncomeValidatorFields).unknown();

const expensesValidatorFields = {
    year: Joi.number().required().label('Year'),
    healthcare: Joi.number().required().default('0'),
    charitable_contributions: Joi.number().required().default('0'),
    home_mortgage: Joi.number().required().default('0'),
    casualty_theft_losses: Joi.number().required().default('0'),
    paid_alimony: Joi.number().required().default('0'),
    itemize_returns: Joi.number().required().default('0'),
    sales_excise_taxes: Joi.number().required().default('0'),
    resident_states: Joi.number().required().default('0'),
    family_health_insurance: Joi.number().required().default('0'),
    home_work_address: Joi.number().required().default('0'),
    hsa: Joi.number().required().default('0'),
    ira: Joi.number().required().default('0'),
    student_loan: Joi.number().required().default('0'),
    tuition_fee: Joi.number().required().default('0'),
    health_insurance_covered: Joi.number().required().default('0'),
    enrolled_insurance: Joi.number().required().default('0'),
    additional_contributions: Joi.number().required().default('0'),
    energy_saving_product: Joi.number().required().default('0'),
    hybrid_motor_vehicle: Joi.number().required().default('0'),
};
const expensesValidatorSchema = Joi.object(expensesValidatorFields).unknown();

const rentalIncomeValidatorFields = {
    year: Joi.number().required().label('Year'),
    building_value: Joi.string().optional().allow('').default(''),
    land_value: Joi.string().optional().allow('').default(''),
    property_address: Joi.string().optional().allow('').default(''),
    number_of_days_rented: Joi.string().optional().allow('').default(''),
    property_purchased_date: Joi.string().optional().allow('').default(''),
    property_holder: Joi.string().optional().allow('').default(''),
    income: Joi.string().optional().allow('').default(''),
    rents_received: Joi.string().optional().allow('').default(''),
    royalties_received: Joi.string().optional().allow('').default(''),
    expenses: Joi.string().optional().allow('').default(''),
    mortgage_interest: Joi.string().optional().allow('').default(''),
    other_interest: Joi.string().optional().allow('').default(''),
    insurance: Joi.string().optional().allow('').default(''),
    repairs: Joi.string().optional().allow('').default(''),
    auto_travel: Joi.string().optional().allow('').default(''),
    advertising: Joi.string().optional().allow('').default(''),
    taxes: Joi.string().optional().allow('').default(''),
    legal_professional_fees: Joi.string().optional().allow('').default(''),
    cleaning_maintenance: Joi.string().optional().allow('').default(''),
    commissions: Joi.string().optional().allow('').default(''),
    utilities: Joi.string().optional().allow('').default(''),
    management_fees: Joi.string().optional().allow('').default(''),
    supplies: Joi.string().optional().allow('').default(''),
    other_expenses: Joi.string().optional().allow('').default(''),
};
const rentalIncomeValidatorSchema = Joi.object(rentalIncomeValidatorFields).unknown();

export default {
    otherIncomeValidatorSchema,
    expensesValidatorSchema,
    rentalIncomeValidatorSchema,
};