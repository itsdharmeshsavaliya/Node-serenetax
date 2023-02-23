import { Connection } from '../database';
import { commonHelper } from '../helper';
import { messageTypeJSON } from '../staticdata';

const Messages = {
    async fetchMessages(user_id) {
        let data = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM messages_mast WHERE user_id = ?`, [user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        let messages = [];
        if (data.length > 0) {
            data = await commonHelper.nullToEmptyString(data);
            messages = await data.map((message) => {
                message.message_type = commonHelper.getKeyValueFromMatchedObject(messageTypeJSON, "message_type_id", message.message_type_id, "message_type");
                return message;
            });
        }
        return messages;
    },
    async sendMessage(payload) {
        let { user_id, subject, message_type_id, message } = payload;
        return new Promise(function(resolve, reject) {
            let created_at = new Date();
            const sql = `INSERT INTO messages_mast (user_id, subject, message_type_id, message, updated_at, created_at) VALUES (?,?,?,?,?,?)`;
            Connection.query(sql, [user_id, subject, message_type_id, message, created_at, created_at], function(err, result) {
                if (err) return reject(err);
                const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                resolve(affectedRows);
            });
        });
    },
}
export default Messages;