import BaseServices from "./BaseServices.js";

class AdminService extends BaseServices{

    async getAdmins() : Promise<any> {
        const sql: string = "SELECT * FROM admin";
        
        try {
            const [rows, fields] = await this.promiseConnection.query(sql);
            return rows;
        } catch (error) {
            return error;
        }
    }

    async getAdmin(params: object) : Promise<any> {
        const sql: string = "SELECT * FROM admin WHERE id = ?";
        
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
        }
    }

    async postAdmin(params: object) : Promise<any> {
        const sql: string = "INSERT INTO admin SET ?";
        
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
            
        }
    }

    async putAdmin(params: object) : Promise<any> {
        const sql: string = "UPDATE admin SET ? WHERE id = ?";
        
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
        }
    }

    async deleteAdmin(params: object) : Promise<any> {
        const sql: string = "DELETE FROM admin WHERE id = ?";
        
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
        }
    }

}

const adminService = new AdminService();

export default adminService;