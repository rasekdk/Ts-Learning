import { userUpdateInterface } from "../interfaces/user.interface";
import { connect } from "../src/database";
import { checkIfExist } from "./check.repository";

export async function insertUser(data:object) {
    const conn = await connect();
    await conn.query('INSERT INTO users SET ?', [data]);
}

export async function selectUser(data:string) {
    try {
        const connection = await connect();

        const [user] : any = await connection.query('SELECT * FROM users WHERE user = ?', data);           
        
        await checkIfExist(user, 'User');        
        
        return user;
    } catch (err) {    
        throw err;
    }
}

export async function updateUser(data:userUpdateInterface, userId:string) {
    try {
        const connection = await connect();        

        const user = await selectUser(userId);
        
        checkIfExist(user, 'User');
        
        const [userUpdated] : any = await connection.query('UPDATE users SET user = ?, name = ?, email = ?, description = ?, site =?, location = ?, birth = ?, img_url = ?, img_bg_url = ? WHERE user = ?', [data.user, data.name, data.email, data.description, data.site, data.location, data.birth, data.img_url, data.img_bg_url , userId]);

        const newUserId = data.user !== undefined ? data.user : userId;
        
        const newUser = await selectUser(newUserId);

        console.log(newUser);
        

        return newUser;

    } catch (err) {
        console.log(err);
        
    }
}