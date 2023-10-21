import { Response, Request } from "express";
import productService from "../../services/products.service.js";

class SendProducts {

    sendProduct(req: Request, res: Response): Response {
        const data: object = productService.sendProducts();
        return res.status(200).send(data);
    }
}

const sendProduct = new SendProducts();

export default sendProduct;