import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from '../config';
import mysql from 'mysql';

// Create MySQL Connection
const Connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    multipleStatements: true, //for multiple query connection.query('SELECT ?; SELECT ?')
    dateStrings: true, //convert 2001-02-01T18:30:00.000Z to 2001-02-01 18:30:00
});

// Connect MySQL
Connection.connect((err) => {
    if (err) {
        console.log(err);
        return new Error(err);
    }
    console.log('DB connected...');
});

export { Connection };