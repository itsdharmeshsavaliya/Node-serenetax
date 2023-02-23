import moment from 'moment/moment';
import { Connection } from '../database';
import { commonHelper } from '../helper';

const Documents = {
    async fetchOtherIncomeInfo(user_id, year) {
        let data = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM other_income_mast WHERE user_id = ? AND year = ?', [user_id, year], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (data.length > 0) ? commonHelper.nullToEmptyString(data[0]) : {};
    },
    async saveOtherIncomeInfo(payload) {
        let { action, user_id, year, interest_dividend, business_income, sold_stocks, sold_espp, rental_income, earned_interest, draw_money_hsa, draw_money_ira, received_refund, received_compensation, income_or_losses, received_third_party_payment } = payload;
        let created_at = new Date();

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO other_income_mast (user_id, year, interest_dividend, business_income, sold_stocks, sold_espp, rental_income, earned_interest, draw_money_hsa, draw_money_ira, received_refund, received_compensation, income_or_losses, received_third_party_payment, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, year, interest_dividend, business_income, sold_stocks, sold_espp, rental_income, earned_interest, draw_money_hsa, draw_money_ira, received_refund, received_compensation, income_or_losses, received_third_party_payment, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update other_income_mast SET interest_dividend = ?, business_income = ?, sold_stocks = ?, sold_espp = ?, rental_income = ?, earned_interest = ?, draw_money_hsa = ?, draw_money_ira = ?, received_refund = ?, received_compensation = ?, income_or_losses = ?, received_third_party_payment = ?, updated_at = ? WHERE user_id = ? AND year = ?`;
                Connection.query(sql, [interest_dividend, business_income, sold_stocks, sold_espp, rental_income, earned_interest, draw_money_hsa, draw_money_ira, received_refund, received_compensation, income_or_losses, received_third_party_payment, created_at, user_id, year], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },
    async fetchExpensesInfo(user_id, year) {
        let data = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM expenses_mast WHERE user_id = ? AND year = ?', [user_id, year], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (data.length > 0) ? commonHelper.nullToEmptyString(data[0]) : {};
    },
    async saveExpensesInfo(payload) {
        let { action, user_id, year, healthcare, charitable_contributions, home_mortgage, casualty_theft_losses, paid_alimony, itemize_returns, sales_excise_taxes, resident_states, family_health_insurance, home_work_address, hsa, ira, student_loan, tuition_fee, health_insurance_covered, enrolled_insurance, additional_contributions, energy_saving_product, hybrid_motor_vehicle } = payload;
        let created_at = new Date();

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO expenses_mast (user_id, year, healthcare, charitable_contributions, home_mortgage, casualty_theft_losses, paid_alimony, itemize_returns, sales_excise_taxes, resident_states, family_health_insurance, home_work_address, hsa, ira, student_loan, tuition_fee, health_insurance_covered, enrolled_insurance, additional_contributions, energy_saving_product, hybrid_motor_vehicle, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, year, healthcare, charitable_contributions, home_mortgage, casualty_theft_losses, paid_alimony, itemize_returns, sales_excise_taxes, resident_states, family_health_insurance, home_work_address, hsa, ira, student_loan, tuition_fee, health_insurance_covered, enrolled_insurance, additional_contributions, energy_saving_product, hybrid_motor_vehicle, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update expenses_mast SET healthcare = ?, charitable_contributions = ?, home_mortgage = ?, casualty_theft_losses = ?, paid_alimony = ?, itemize_returns = ?, sales_excise_taxes = ?, resident_states = ?, family_health_insurance = ?, home_work_address = ?, hsa = ?, ira = ?, student_loan = ?, tuition_fee = ?, health_insurance_covered = ?, enrolled_insurance = ?, additional_contributions = ?, energy_saving_product = ?, hybrid_motor_vehicle = ?, updated_at = ? WHERE user_id = ? AND year = ?`;
                Connection.query(sql, [healthcare, charitable_contributions, home_mortgage, casualty_theft_losses, paid_alimony, itemize_returns, sales_excise_taxes, resident_states, family_health_insurance, home_work_address, hsa, ira, student_loan, tuition_fee, health_insurance_covered, enrolled_insurance, additional_contributions, energy_saving_product, hybrid_motor_vehicle, created_at, user_id, year], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },
    async fetchRentalIncomeInfo(user_id, year) {
        let data = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM rental_income_mast WHERE user_id = ? AND year = ?', [user_id, year], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (data.length > 0) ? commonHelper.nullToEmptyString(data[0]) : {};
    },
    async saveRentalIncomeInfo(payload) {
        let { action, user_id, year, building_value, land_value, property_address, number_of_days_rented, property_purchased_date, property_holder, income, rents_received, royalties_received, expenses, mortgage_interest, other_interest, insurance, repairs, auto_travel, advertising, taxes, legal_professional_fees, cleaning_maintenance, commissions, utilities, management_fees, supplies, other_expenses } = payload;
        let created_at = new Date();
        property_purchased_date = commonHelper.emptyDateToNULL(property_purchased_date);
        property_purchased_date = (property_purchased_date) ? moment(property_purchased_date, 'DD-MM-YYYY').format('YYYY-MM-DD') : null;

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO rental_income_mast (user_id, year, building_value, land_value, property_address, number_of_days_rented, property_purchased_date, property_holder, income, rents_received, royalties_received, expenses, mortgage_interest, other_interest, insurance, repairs, auto_travel, advertising, taxes, legal_professional_fees, cleaning_maintenance, commissions, utilities, management_fees, supplies, other_expenses, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, year, building_value, land_value, property_address, number_of_days_rented, property_purchased_date, property_holder, income, rents_received, royalties_received, expenses, mortgage_interest, other_interest, insurance, repairs, auto_travel, advertising, taxes, legal_professional_fees, cleaning_maintenance, commissions, utilities, management_fees, supplies, other_expenses, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update rental_income_mast SET building_value = ?, land_value = ?, property_address = ?, number_of_days_rented = ?, property_purchased_date = ?, property_holder = ?, income = ?, rents_received = ?, royalties_received = ?, expenses = ?, mortgage_interest = ?, other_interest = ?, insurance = ?, repairs = ?, auto_travel = ?, advertising = ?, taxes = ?, legal_professional_fees = ?, cleaning_maintenance = ?, commissions = ?, utilities = ?, management_fees = ?, supplies = ?, other_expenses = ?, updated_at = ? WHERE user_id = ? AND year = ?`;
                Connection.query(sql, [building_value, land_value, property_address, number_of_days_rented, property_purchased_date, property_holder, income, rents_received, royalties_received, expenses, mortgage_interest, other_interest, insurance, repairs, auto_travel, advertising, taxes, legal_professional_fees, cleaning_maintenance, commissions, utilities, management_fees, supplies, other_expenses, created_at, user_id, year], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },
}
export default Documents;