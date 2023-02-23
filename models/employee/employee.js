import moment from 'moment/moment';
import mysql from 'mysql';
import { Connection } from '../../database';
import { commonHelper } from '../../helper';

const Employee = {
    async fetch(username, action = "email") {
        let employee = await new Promise((resolve, reject) => {
            let query = 'SELECT * FROM employee_mast WHERE email = ?';
            let fields = [username];
            // if (action === "both") {
            //     query = 'SELECT * FROM employee_mast WHERE email = ? OR username = ?';
            //     fields = [username, username];
            // }
            Connection.query(query, fields, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (employee.length > 0) ? commonHelper.nullToEmptyString(employee[0]) : {};
    },
    async fetchById(employee_id) {
        let employee = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM employee_mast WHERE employee_id = ?`, [employee_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (employee.length > 0) {
            employee = commonHelper.nullToEmptyString(employee[0]);
            delete employee.password; // or delete employee["password"];
        } else {
            employee = {};
        }
        return employee;
    },
}
export default Employee;