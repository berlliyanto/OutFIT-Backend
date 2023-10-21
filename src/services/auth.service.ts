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

    async profile (params: object): Promise<any> {
        const sql: string = "SELECT * FROM user WHERE id = ?";
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error
        }
    }

    async updateProfile (params: object): Promise<any> {
        const sql: string = "UPDATE user SET ? WHERE id = ?";
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        }catch(error){
            return error;
        }
    }

    async forgotPassword(params: object): Promise<any> {
        const sql: string = "SELECT * FROM user WHERE email = ?";
        try{
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error){
            return error;
        }
    }

    async resetPasswordGetUser(params:object): Promise<any> {
        const sql: string = "SELECT * FROM user WHERE id = ?";
        try{
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error){
            return error;
        }
    }

    async resetPasswordUpdate(params: object): Promise<any> {
        console.log(params);
        const sql: string = "UPDATE user SET password = ? WHERE id = ?";
        try{
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error){
            return error;
        }
    }

}

const authService = new AuthService;
export default authService;