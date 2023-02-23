import { Connection } from '../database';

const RefreshToken = {
    async create(payload) {
        let { token } = payload;
        let created_at = new Date();
        return new Promise(function(resolve, reject) {
            const sql = `INSERT INTO refreshtokens (token, updated_at, created_at) VALUES (?,?,?)`;
            Connection.query(sql, [token, created_at, created_at], function(err, result) {
                if (err) return reject(err);
                const id = result ? result.insertId : "";
                resolve(id);
            });
        });
    },
    async delete(payload) {
        let { token } = payload;
        return new Promise(function(resolve, reject) {
            const sql = `DELETE FROM refreshtokens WHERE token = ?`;
            Connection.query(sql, [token], function(err, result) {
                if (err) return reject(err);
                resolve((result.affectedRows > 0) ? true : false);
            });
        });
    },
}
export default RefreshToken;