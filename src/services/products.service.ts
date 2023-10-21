import { men_all } from "../api/products.js";
import BaseServices from "./BaseServices.js";

class ProductService extends BaseServices {
    async addProduct(params: object): Promise<any>{
        const sql = 'INSERT INTO product SET ?';
        try {
            const [rows, fields] = await this.promiseConnection.query(sql, params);
            return rows;
        } catch (error) {
            return error;
        }
    }

    sendProducts(): object{
        const data: object = men_all;
        return data
    }
}

const productService = new ProductService();

export default productService;