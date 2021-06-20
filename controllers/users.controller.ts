// Modules
import { Response, Request } from "express";

// Code
import { connect } from "../src/database";

export async function getUsers(req: Request, res: Response): Promise<Response>{
    const connection = await connect();

    const users = await connection.query('SELECT * FROM users');

    return res.json(users[0])
}