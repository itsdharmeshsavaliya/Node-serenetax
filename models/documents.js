import { Connection } from '../database';
import { commonHelper } from '../helper';

const Documents = {
    async fetchDocuments(user_id, year) {
        let documents = await new Promise((resolve, reject) => {
            Connection.query(`SELECT * FROM documents_mast WHERE user_id = ? AND year = ?`, [user_id, year], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (documents.length > 0) {
            documents = commonHelper.nullToEmptyString(documents);
        }
        return documents;
    },
    async saveDocument(payload) {
        let { user_id, year, document_name, document_type_id, document_comments, document_file } = payload;
        let created_at = new Date();
        return new Promise(function(resolve, reject) {
            const sql = `INSERT INTO documents_mast (user_id, year, document_name, document_type_id, document_comments, document_file, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?)`;
            Connection.query(sql, [user_id, year, document_name, document_type_id, document_comments, document_file, created_at, created_at], function(err, result) {
                if (err) return reject(err);
                const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                resolve(affectedRows);
            });
        });
    },
    async fetchbyId(document_id) {
        let document = await new Promise((resolve, reject) => {
            Connection.query('SELECT * FROM documents_mast WHERE document_id = ?', [document_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return (document.length > 0) ? commonHelper.nullToEmptyString(document[0]) : {};
    },
    async delete(document_id) {
        return new Promise((resolve, reject) => {
            Connection.query('DELETE FROM documents_mast WHERE document_id = ?', [document_id], (err, result) => {
                if (err) return reject(err);
                const affectedRows = result ? ((result.affectedRows || result.changedRows) ? true : false) : false;
                resolve(affectedRows);
            });
        });
    },
}
export default Documents;