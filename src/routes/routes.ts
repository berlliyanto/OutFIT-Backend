import {Request, Response } from 'express';

import { auth } from '../middlewares/auth.middleware.js';
import RoutePaths from './routes_name.js';
import BaseRoutes from './routes_base.js';
import AdminController from '../controllers/admin/admin.controller.js';
import authController from '../controllers/auth/auth.controller.js';
import validateRegister from '../middlewares/register.validator.js';
import upload from '../utils/uploadImages.js';
import sendProduct from '../controllers/products/send.controller.js';
import { validatePassword } from '../middlewares/resetPw.validator.js';

class Routes extends BaseRoutes {
    routes(): void {
        this.router.get(RoutePaths.DEFAULT, (req: Request, res: Response) => {
            res.send('No Routes Found');
        });

        this.router.post(RoutePaths.AUTH_REGISTER,  upload.single('image'), validateRegister, authController.register);
        this.router.post(RoutePaths.AUTH_LOGIN, authController.login);
        this.router.get(RoutePaths.AUTH_PROFILE, auth, authController.profile);
        this.router.put(RoutePaths.AUTH_PROFILE, auth, upload.single('image'), authController.updateProfile);
        this.router.post(RoutePaths.AUTH_FORGOTPW, authController.forgotPassword);
        this.router.post(RoutePaths.AUTH_RESETPW, validatePassword, authController.resetPassword);

        this.router.get(RoutePaths.GET_ADMINS, AdminController.showAll);
        this.router.get(RoutePaths.GET_ADMIN_BYID, AdminController.show);
        this.router.post(RoutePaths.POST_ADMIN, AdminController.create);
        this.router.put(RoutePaths.PUT_ADMIN_BYID, AdminController.update);
        this.router.delete(RoutePaths.DELETE_ADMIN_BYID, AdminController.delete);

        this.router.get('/products', sendProduct.sendProduct);
    }
}

const router = new Routes().router;

export default router;