import { connect } from "../src/database";

export async function insertUser(data :object) {
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [data]);
}