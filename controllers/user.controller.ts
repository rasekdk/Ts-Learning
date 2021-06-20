// Modules
import { Response, Request} from "express";

// Code
import { userCreationInterface, userUpdateInterface } from "../interfaces/user.interface";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";
import { insertUser, selectUser, updateUser } from "../repository/user.repository";
import { connect } from "../src/database";

export async function createUser(req:Request, res: Response): Promise<Response> {
    try {
        const newUser: userCreationInterface = req.body;

        await userSchema(newUser);

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

export async function putUser(req:Request, res:Response) : Promise<Response> {
    try {
        const params = req.params;
    const data:userUpdateInterface = req.body;

    await userUpdateSchema(data);

    const user = await updateUser(data, params.userId);    

    return res.send(user);
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