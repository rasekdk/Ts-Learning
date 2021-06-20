// Modules
import { Response, Request } from "express";

// Code
import { connect } from "../src/database";
import { userInterface } from "../interfaces/user.interface";

export async function getUsers(req: Request, res: Response): Promise<Response>{
    const conn = await connect();

    const users = await conn.query('SELECT * FROM users');

    return res.json(users[0])
}

export async function createUser(req:Request, res: Response): Promise<Response> {
    const newUser= req.body;
    
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [newUser]);

    return res.json({
        message: 'User Created'
    });
}