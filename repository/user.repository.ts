import { ErrorInterface } from "../interfaces/error.interfaces";
import { connect } from "../src/database";

export async function insertUser(data :object) {
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [data]);
}

export async function selectUser(data: string) {
    try {
        const connection = await connect();
        
        const [user] : any = await connection.query('SELECT * FROM users WHERE user = ?', data);           
        
        if(!user.length) {
            const err: ErrorInterface = new Error('Not-Found');
            err.status = 404;
            err.message = 'User not found';
            err.name = 'Not-Found'

            throw err;
        }
        
        return user;
    } catch (err) {
        console.log(err);
        
        throw err
    }
}