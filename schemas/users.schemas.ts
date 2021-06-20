import Joi from "joi";

import { ErrorInterface } from "../interfaces/error.interfaces";
import { userUpdateInterface } from "../interfaces/user.interface";


export async function userSchema (newUser: any) {
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

export async function userUpdateSchema(newData:userUpdateInterface) {
    try {
        const schema = Joi.object({
            user: Joi.string()
                .alphanum()
                .min(3)
                .max(45),
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(45),
            email: Joi.string()
                .email(),
            description: Joi.string()
                .min(0)
                .max(150),
            site: Joi.string()
                .uri()
                .max(1600),
            location: Joi.string()
                .max(60),
            birth: Joi.date(),
            img_url: Joi.string()
                .uri()
                .max(1600),
            img_bg_url: Joi.string()
                .uri()
                .max(1600),
        });
        await schema.validateAsync(newData);
    
        
    } catch (err) {

        const errorMessage = 'ValidationError';
        const error:ErrorInterface = new Error(err);
        error.name = errorMessage;
        error.message = err.message

        throw error;
    }
}