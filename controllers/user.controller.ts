// Modules
import { Response, Request, response } from "express";
import Joi from "joi";

// Code
import { connect } from "../src/database";
import { userInterface } from "../interfaces/user.interface";
import { userSchema } from "../schemas/users.schemas";
import { insertUser } from "../repository/user.repository";
import { ErrorInterface } from "../interfaces/error.interfaces";

export async function getUsers(req: Request, res: Response): Promise<Response>{
    const conn = await connect();

    const users = await conn.query('SELECT * FROM users');

    return res.json(users[0])
}

export async function createUser(req:Request, res: Response): Promise<Response> {
    try {
        const newUser: userInterface = req.body;

        await userSchema(newUser, res);

        await insertUser(newUser);

        return res.json(newUser);
    } catch (err) {
        
        err.name === 'ValidationError' ? err.status = 400 : err.status = 500;

        res.status(err.status);

        return res.send({error: err.name, message: err.message, status : err.status})
    }
}