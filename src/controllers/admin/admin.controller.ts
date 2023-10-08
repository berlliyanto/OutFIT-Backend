import { Request, Response } from "express";
import adminService from "../../services/admin.service.js";
import IController from "../ControllerInterface.js";
import AdminModel from "../../models/admin.model.js";

class AdminController implements IController {
    async showAll(req: Request, res: Response): Promise<Response> {
        try {
            const response = await adminService.getAdmins();
            return res.send(response);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    async show(req: Request, res: Response): Promise<Response> {
        const id: string = req.params['id'];
        try {
            const [ response ] = await adminService.getAdmin([id]);
            return res.send(response);
        } catch (error) {
            return res.send(error);
        }
    };

    async create(req: Request, res: Response): Promise<Response> {
        const adminModel: AdminModel = req.body;
        try {
            const response = await adminService.postAdmin(adminModel);
            return res.send(response);
        } catch (error) {   
            return res.send(error);
        }
    };

    async update(req: Request, res: Response): Promise<Response> {
        const adminModel: AdminModel = req.body;
        const id: string = req.params['id'];
        try {
            const response = await adminService.putAdmin([adminModel, id]);
            return res.send(response);
        } catch (error) {   
            return res.send(error);
        }
    };

    async delete(req: Request, res: Response): Promise<Response> {
        const id: string = req.params['id'];
        try {
            const response = await adminService.deleteAdmin([id]);
            return res.send(response);
        } catch (error) {
            return res.send(error);
        }
    };
}

const adminController = new AdminController();

export default adminController;