import Joi from "joi";

import { ErrorInterface } from "../interfaces/error.interfaces";


export async function userSchema (newUser: any, res: any) {
    try {
        const schema = Joi.object({
            user: Joi.string()
                .alphanum()
                .min(3)
                .max(45)
                .required(),
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(45)
                .required(),
            password: Joi.string()
                .alphanum()
                .min(4)
                .max(35)
                .regex(/^\S+$/)
                .required(),
            repeatPassword: Joi.ref('password'),
            email: Joi.string()
                .email()
                .required(),
        });
        await schema.validateAsync(newUser);
    
        
    } catch (err) {

        const errorMessage = 'ValidationError';
        const error:ErrorInterface = new Error(err);
        error.name = errorMessage;
        error.message = err.message

        throw error;
    }
}