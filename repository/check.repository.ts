import { ErrorInterface } from "../interfaces/error.interfaces";

export async function checkIfExist(data: any, name: string) {
    try {
        if(!data.length) {
            const err: ErrorInterface = new Error('Not-Found');
            err.status = 404;
            err.message = `${name} not Found`;
            err.name = 'Not-Found'
    
            throw err;
        }
    } catch (err) {
        throw err;
    }
}