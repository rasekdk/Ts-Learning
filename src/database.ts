import { createPool } from "mysql2/promise";

require('dotenv').config();

const {
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASSWORD
} = process.env;

export async function connect() {
    
    const connection = await createPool({
        host: DB_HOST,
        user: DB_USER,
        database: DB_NAME,
        password: DB_PASSWORD,
        connectionLimit: 10
    });

    return connection;

}