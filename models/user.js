import moment from 'moment/moment';
import mysql from 'mysql';
import { Connection } from '../database';
import { commonHelper } from '../helper';

const User = {
    async isUserExist(user_id) {
        let user = await new Promise((resolve, reject) => {
            Connection.query('SELECT user_id FROM user_mast WHERE user_id = ?', [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (user.length > 0) ? true : false;
    },
    async isEmailExist(email) {
        let user = await new Promise((resolve, reject) => {
            Connection.query('SELECT user_id FROM user_mast WHERE email = ?', [email], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (user.length > 0) ? true : false;
    },
    async isPhoneNumberExist(phone) {
        let user = await new Promise((resolve, reject) => {
            Connection.query('SELECT user_id FROM user_mast WHERE phone = ? OR alternate_phone = ?', [phone, phone], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (user.length > 0) ? true : false;
    },
    async fetch(username, action = "email") {
        let user = await new Promise((resolve, reject) => {
            let query = 'SELECT * FROM user_mast WHERE email = ?';
            let fields = [username];
            // if (action === "both") {
            //     query = 'SELECT * FROM user_mast WHERE email = ? OR username = ?';
            //     fields = [username, username];
            // }
            Connection.query(query, fields, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (user.length > 0) ? commonHelper.nullToEmptyString(user[0]) : {};
    },
    async fetchById(user_id, action = "") {
        let user = await new Promise((resolve, reject) => {
            let fields = (action === "all") ? '*' : 'user_id, filing_id, login_from, social_auth_id, fullname, email, year_of_tax_filing, phone, alternate_phone, do_you_know, preferred_timezone, wallet_balance, status';
            Connection.query(`SELECT ${fields} FROM user_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (user.length > 0) {
            user = commonHelper.nullToEmptyString(user[0]);
            delete user.password; // or delete user["password"];
        } else {
            user = {};
        }
        return user;
    },
    async fetchByEmail(email) {
        let user = await new Promise((resolve, reject) => {
            Connection.query('SELECT user_id, filing_id, login_from, social_auth_id, fullname, email, year_of_tax_filing, phone, alternate_phone, do_you_know, preferred_timezone, wallet_balance, status FROM user_mast WHERE email = ?', [email], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (user.length > 0) ? commonHelper.nullToEmptyString(user[0]) : {};
    },
    socialAuth(login_from, social_auth_id) {
        return new Promise((resolve, reject) => {
            Connection.query('SELECT user_id FROM user_mast WHERE login_from = ? AND social_auth_id = ?', [login_from, social_auth_id], (err, result, fields) => {
                if (err) return reject(err);
                const user_id = (result[0]) ? result[0].user_id : "";
                resolve(user_id);
            });
        });
    },
    createSocial(payload) {
        let { login_from, social_auth_id, fullname, email } = payload;
        let created_at = new Date();
        return new Promise(function(resolve, reject) {
            const sql = `INSERT INTO user_mast (login_from, social_auth_id, fullname, email, status, updated_at, created_at) VALUES (?,?,?,?,?,?,?)`;
            Connection.query(sql, [login_from, social_auth_id, fullname, email, 1, created_at, created_at], function(err, result) {
                if (err) return reject(err);
                const user_id = result ? result.insertId : "";
                resolve(user_id);
            });
        });
    },
    create(payload) {
        let {
            name,
            email,
            password,
            year_of_tax_filing,
            phone,
            alternate_phone,
            do_you_know,
            advertisements,
            others,
            preferred_timezone
        } = payload;
        year_of_tax_filing = commonHelper.zeroToNULL(year_of_tax_filing);
        do_you_know = commonHelper.zeroToNULL(do_you_know);
        preferred_timezone = commonHelper.zeroToNULL(preferred_timezone);

        let created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        console.log(created_at);
        return new Promise(function(resolve, reject) {
            const sql = `INSERT INTO user_mast (login_from, email, fullname, password, year_of_tax_filing, phone, alternate_phone, do_you_know, advertisements, others, preferred_timezone, status, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            Connection.query(sql, ["manually", email, name, password, year_of_tax_filing, phone, alternate_phone, do_you_know, advertisements, others, preferred_timezone, 1, created_at, created_at], function(err, result) {
                if (err) return reject(err);
                const user_id = result ? result.insertId : "";
                resolve(user_id);
            });
        });
    },
    async setFilingID(user_id) {
        return new Promise(function(resolve, reject) {
            const filing_id = `10000${user_id}`;
            let updated_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
            const sql = `Update user_mast SET filing_id = ?, updated_at = ? WHERE user_id = ?`;
            Connection.query(sql, [filing_id, updated_at, user_id], function(err, result) {
                if (err) return reject(err);
                const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                resolve(isUpdated);
            });
        });
    },
    async saveProfileInfo({ user_id, name, email, phone, login_from }) {
        return new Promise(function(resolve, reject) {
            let updated_at = new Date();
            let sql = '';
            if (login_from === "manually") {
                sql = `Update user_mast SET fullname = ?, email = ?, phone = ?, updated_at = ? WHERE user_id = ?`;
                Connection.query(sql, [name, email, phone, updated_at, user_id], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            } else {
                sql = `Update user_mast SET fullname = ?, phone = ?, updated_at = ? WHERE user_id = ?`;
                Connection.query(sql, [name, phone, updated_at, user_id], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            }
        });
    },
    async getPassword(user_id) {
        let user = await new Promise((resolve, reject) => {
            let sql = 'SELECT user_id, login_from, password FROM user_mast WHERE user_id = ?';
            Connection.query(sql, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (user.length > 0) ? commonHelper.nullToEmptyString(user[0]) : {};
    },
    async setNewPassword(user_id, password) {
        return new Promise(function(resolve, reject) {
            let updated_at = new Date();
            const sql = `Update user_mast SET password = ?, updated_at = ? WHERE user_id = ?`;
            Connection.query(sql, [password, updated_at, user_id], function(err, result) {
                if (err) return reject(err);
                const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                resolve(isUpdated);
            });
        });
    },
    async getResidentialAddressInfo(user_id, year, action) {
        let tablename = (action == "user") ? 'user_residential_address_mast' : ((action == "spouse") ? 'spouse_residential_address_mast' : 'dependent_residential_address_mast');
        let residentialAddressInfo = await new Promise((resolve, reject) => {
            const sql = `SELECT year, data FROM ${tablename} WHERE user_id = ? AND year = ?`;
            Connection.query(sql, [user_id, year], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (residentialAddressInfo.length > 0) {
            residentialAddressInfo = commonHelper.nullToEmptyString(residentialAddressInfo[0]);
            residentialAddressInfo.data = commonHelper.parseJSON(residentialAddressInfo.data);
        }
        return residentialAddressInfo;
    },
    async getSpouseIdentityInfo(user_id) {
        let spouseIdentityInfo = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM spouse_identity_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (spouseIdentityInfo.length > 0) {
            spouseIdentityInfo = commonHelper.nullToEmptyString(spouseIdentityInfo[0]);
        } else {
            spouseIdentityInfo = {};
        }
        return spouseIdentityInfo;
    },
    async saveUserInfo(payload) { //Personal Identity Information, Contact Information
        let {
            filing_status_id,
            fullname,
            occupation,
            preferred_timezone,
            ssn,
            dob,
            anniversary_date,
            visa_type_id,
            first_entry_date,
            indian_phone,
            mailing_address,
            appartment,
            city,
            state,
            zip,
            is_more_employer,
            employer_info,
            user_id
        } = payload;
        filing_status_id = commonHelper.zeroToNULL(filing_status_id);
        visa_type_id = commonHelper.zeroToNULL(visa_type_id);
        dob = commonHelper.emptyDateToNULL(dob);
        anniversary_date = commonHelper.emptyDateToNULL(anniversary_date);
        first_entry_date = commonHelper.emptyDateToNULL(first_entry_date);
        let updated_at = new Date();

        return new Promise(function(resolve, reject) {
            const sql = `Update user_mast SET 
            filing_status_id = ?,
            fullname = ?,
            occupation = ?,
            preferred_timezone = ?, 
            ssn = ?,
            dob = ?,
            anniversary_date = ?,
            visa_type_id = ?,
            first_entry_date = ?,
            indian_phone = ?,
            mailing_address = ?,
            appartment = ?,
            city = ?,
            state = ?,
            zip = ?,
            is_more_employer = ?,
            employer_info = ?,
            updated_at = ? 
            WHERE user_id = ?`;
            Connection.query(sql, [
                filing_status_id,
                fullname,
                occupation,
                preferred_timezone,
                ssn,
                dob,
                anniversary_date,
                visa_type_id,
                first_entry_date,
                indian_phone,
                mailing_address,
                appartment,
                city,
                state,
                zip,
                is_more_employer,
                employer_info,
                updated_at,
                user_id
            ], function(err, result) {
                if (err) return reject(err);
                const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                resolve(isUpdated);
            });
        });
    },
    async saveResidentialAddressInfo({ user_id, residential_address, action }) {
        let tablename = (action == "user") ? 'user_residential_address_mast' : ((action == "spouse") ? 'spouse_residential_address_mast' : 'dependent_residential_address_mast');
        let { year, data } = residential_address;
        if (!year) return false;
        if (!data) return false;

        let isAddressAlreadySaved = await new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${tablename} WHERE user_id = ? AND year = ?`;
            Connection.query(sql, [user_id, year], (err, result) => {
                if (err) return reject(err);
                const isSaved = (result.length > 0) ? true : false;
                resolve(isSaved);
            });
        });

        let addresses = await data.map(function(address) {
            address.from_date = moment(address.from_date, 'DD-MM-YYYY').format('YYYY-MM-DD');
            address.to_date = moment(address.to_date, 'DD-MM-YYYY').format('YYYY-MM-DD');
            return address;
        });
        addresses = JSON.stringify(addresses);

        const created_at = new Date();
        if (isAddressAlreadySaved) { //Update
            return new Promise(function(resolve, reject) {
                const sql = `Update ${tablename} SET year = ?, data = ?, updated_at = ? WHERE user_id = ? AND year = ?`;
                Connection.query(sql, [year, addresses, created_at, user_id, year], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        } else { //Insert
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO ${tablename} (user_id, year, data, updated_at, created_at) VALUES (?,?,?,?,?)`;
                Connection.query(sql, [user_id, year, addresses, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        }
    },
    async isSpouseInfoSaved(user_id) {
        let SpouseInfo = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM spouse_identity_mast WHERE user_id = ?', [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (SpouseInfo.length > 0) ? true : false;
    },
    async saveSpouseInfo(payload) { //Spouse Identity Information

        let { action, user_id, fname, mname, lname, dob, visa_type_id, first_entry_date, occupation, irs_status_id, ssn_itin } = payload;
        irs_status_id = commonHelper.zeroToNULL(irs_status_id);
        visa_type_id = commonHelper.zeroToNULL(visa_type_id);
        let created_at = new Date();

        dob = moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD');
        first_entry_date = moment(first_entry_date, 'DD-MM-YYYY').format('YYYY-MM-DD');

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO spouse_identity_mast (user_id, fname, mname, lname, dob, visa_type_id, first_entry_date, occupation, irs_status_id, ssn_itin, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, fname, mname, lname, dob, visa_type_id, first_entry_date, occupation, irs_status_id, ssn_itin, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update spouse_identity_mast SET fname = ?, mname = ?, lname = ?, dob = ?, visa_type_id = ?, first_entry_date = ?, occupation = ?, irs_status_id = ?, ssn_itin = ?, updated_at = ? WHERE user_id = ?`;
                Connection.query(sql, [fname, mname, lname, dob, visa_type_id, first_entry_date, occupation, irs_status_id, ssn_itin, created_at, user_id], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },

    //Dependent Info
    async fetchDependentInfo(user_id) {
        let dependentInfo = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM dependent_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (dependentInfo.length > 0) {
            dependentInfo = commonHelper.nullToEmptyString(dependentInfo[0]);
        } else {
            dependentInfo = {};
        }
        return dependentInfo;
    },
    async getDependentResidentialAddressInfo(user_id) {
        let residentialAddressInfo = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM dependent_residential_address_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (residentialAddressInfo.length > 0) {
            residentialAddressInfo = commonHelper.nullToEmptyString(residentialAddressInfo);
        }
        return residentialAddressInfo;
    },
    async isDependentInfoSaved(user_id) {
        let DependentInfo = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM dependent_mast WHERE user_id = ?', [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (DependentInfo.length > 0) ? true : false;
    },
    async saveDependentInfo(payload) {

        let { action, user_id, fname, mname, lname, dob, relationship_id, irs_status_id, ssn_itin, visa_type_id, days_stayed, institution_name, institution_tax_id, address, apartment, city, state, zip } = payload;
        irs_status_id = commonHelper.zeroToNULL(irs_status_id);
        visa_type_id = commonHelper.zeroToNULL(visa_type_id);
        days_stayed = commonHelper.zeroToNULL(days_stayed);
        zip = commonHelper.zeroToNULL(zip);

        let created_at = new Date();
        dob = moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD');

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO dependent_mast (user_id, fname, mname, lname, dob, relationship_id, irs_status_id, ssn_itin, visa_type_id, days_stayed, institution_name, institution_tax_id, address, apartment, city, state, zip, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, fname, mname, lname, dob, relationship_id, irs_status_id, ssn_itin, visa_type_id, days_stayed, institution_name, institution_tax_id, address, apartment, city, state, zip, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update dependent_mast SET fname = ?, mname = ?, lname = ?, dob = ?, relationship_id = ?, irs_status_id = ?, ssn_itin = ?, visa_type_id = ?, days_stayed = ?, institution_name = ?, institution_tax_id = ?, address = ?, apartment = ?, city = ?, state = ?, zip = ?, updated_at = ? WHERE user_id = ?`;
                Connection.query(sql, [fname, mname, lname, dob, relationship_id, irs_status_id, ssn_itin, visa_type_id, days_stayed, institution_name, institution_tax_id, address, apartment, city, state, zip, created_at, user_id], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },


    //Bank Details
    async fetchBankInfo(user_id) {
        let bankInfo = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM bankinfo_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (bankInfo.length > 0) {
            bankInfo = commonHelper.nullToEmptyString(bankInfo[0]);
        } else {
            bankInfo = {};
        }
        return bankInfo;
    },
    async isBankInfoSaved(user_id) {
        let DependentInfo = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM bankinfo_mast WHERE user_id = ?', [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (DependentInfo.length > 0) ? true : false;
    },
    async saveBankInfo(payload) {
        let { action, user_id, account_holder_name, bank_name, us_bank_routing_number, us_bank_account_number, account_type_id } = payload;
        account_type_id = commonHelper.zeroToNULL(account_type_id);
        let created_at = new Date();

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO bankinfo_mast (user_id, account_holder_name, bank_name, us_bank_routing_number, us_bank_account_number, account_type_id, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, account_holder_name, bank_name, us_bank_routing_number, us_bank_account_number, account_type_id, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update bankinfo_mast SET account_holder_name = ?, bank_name = ?, us_bank_routing_number = ?, us_bank_account_number = ?, account_type_id = ?, updated_at = ? WHERE user_id = ?`;
                Connection.query(sql, [account_holder_name, bank_name, us_bank_routing_number, us_bank_account_number, account_type_id, created_at, user_id], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },


    //FBAR Info
    async fetchFbarInfo(user_id) {
        let fbarInfo = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM fbar_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (fbarInfo.length > 0) {
            fbarInfo = commonHelper.nullToEmptyString(fbarInfo[0]);
        } else {
            fbarInfo = {};
        }
        return fbarInfo;
    },
    async isFbarInfoSaved(user_id) {
        let fbarInfo = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM fbar_mast WHERE user_id = ?', [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (fbarInfo.length > 0) ? true : false;
    },
    async saveFbarInfo(payload) {
        let { action, user_id, ownership, bank_financial, street_address, city, state, postal_code, account_number, type_of_account, if_others, foreign_currency, income_earned, total_income_earned, maximum_value_of_account, value_of_account, name_of_joint_owner } = payload;
        let created_at = new Date();

        if (action == "insert") {
            return new Promise(function(resolve, reject) {
                const sql = `INSERT INTO fbar_mast (user_id, ownership, bank_financial, street_address, city, state, postal_code, account_number, type_of_account, if_others, foreign_currency, income_earned, total_income_earned, maximum_value_of_account, value_of_account, name_of_joint_owner, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                Connection.query(sql, [user_id, ownership, bank_financial, street_address, city, state, postal_code, account_number, type_of_account, if_others, foreign_currency, income_earned, total_income_earned, maximum_value_of_account, value_of_account, name_of_joint_owner, created_at, created_at], function(err, result) {
                    if (err) return reject(err);
                    const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                    resolve(affectedRows);
                });
            });
        } else { //update
            return new Promise(function(resolve, reject) {
                const sql = `Update fbar_mast SET ownership = ?, bank_financial = ?, street_address = ?, city = ?, state = ?, postal_code = ?, account_number = ?, type_of_account = ?, if_others = ?, foreign_currency = ?, income_earned = ?, total_income_earned = ?, maximum_value_of_account = ?, value_of_account = ?, name_of_joint_owner = ?, updated_at = ? WHERE user_id = ?`;
                Connection.query(sql, [ownership, bank_financial, street_address, city, state, postal_code, account_number, type_of_account, if_others, foreign_currency, income_earned, total_income_earned, maximum_value_of_account, value_of_account, name_of_joint_owner, created_at, user_id], function(err, result) {
                    if (err) return reject(err);
                    const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                    resolve(isUpdated);
                });
            });
        }
    },

    //Referral User
    async fetchReferralUsers(user_id) {
        let referralUsers = await new Promise((resolve, reject) => {
            Connection.query(`SELECT um.user_id, um.fullname, um.email, um.phone FROM referral_mast AS rm JOIN user_mast AS um ON rm.referral_user_id = um.user_id WHERE rm.user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (referralUsers.length > 0) {
            referralUsers = commonHelper.nullToEmptyString(referralUsers);
        }
        return referralUsers;
    },
    async isAlreadyReferralUser(user_id, referral_user_id) {
        let referralUser = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM referral_mast WHERE user_id = ? AND referral_user_id = ?', [user_id, referral_user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (referralUser.length > 0) ? true : false;
    },
    async saveReferralUser(user_id, referral_user_id, type = "mannual") {
        return new Promise(function(resolve, reject) {
            let created_at = new Date();
            const sql = `INSERT INTO referral_mast (user_id, referral_user_id, type, created_at) VALUES (?,?,?,?)`;
            Connection.query(sql, [user_id, referral_user_id, type, created_at], function(err, result) {
                if (err) return reject(err);
                const referral_id = result ? result.insertId : "";
                resolve(referral_id);
            });
        });
    },
    async updateWalletBalance(user_id, amount, action = "+") {
        return new Promise(function(resolve, reject) {
            let updated_at = new Date();
            const sql = `Update user_mast SET wallet_balance = wallet_balance${action}${amount}, updated_at = '${updated_at}' WHERE user_id = ${user_id}`;
            Connection.query(sql, function(err, result) {
                if (err) return reject(err);
                const isUpdated = (result.affectedRows || result.changedRows) ? true : false;
                resolve(isUpdated);
            });
        });
    },
}
export default User;