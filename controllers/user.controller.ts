// Modules
import { Response, Request} from "express";

// Code
import { userInterface } from "../interfaces/user.interface";
import { userSchema } from "../schemas/users.schemas";
import { insertUser, selectUser } from "../repository/user.repository";
import { connect } from "../src/database";

export async function createUser(req:Request, res: Response): Promise<Response> {
    try {
        const newUser: userInterface = req.body;

        await userSchema(newUser, res);

        await insertUser(newUser);

        return res.json(newUser);
    } catch (err) {        
        err.name === 'ValidationError' ? err.status = 400 : err.status = 500;

        return res.status(err.status)
            .send({
                error: err.name, 
                message: err.message, 
                status : err.status
            })
    }
}

export async function getUser(req:Request, res: Response): Promise<Response> {
    try {
        const params = req.params;        

        const user = await selectUser(params.userId);

        console.log(user);
        

        return res.json(user)

    } catch (err) {
        return res.status(err.status)
            .send({
            error: err.name, 
            message: err.message, 
            status : err.status
        })
    }
}