import BaseServices from "./BaseServices.js";

class AuthService extends BaseServices {
    
    async login(params: object) : Promise<any> {
        const sql: string = 'SELECT * FROM user WHERE email = ?';
        try {
            const [rows, field] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
        }
    }

    async register(params: object) : Promise<any> {
        const sql = 'INSERT INTO user SET ?';
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
        }
    }

}

const authService = new AuthService;
export default authService;