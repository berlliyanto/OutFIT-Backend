import IRouter from './routes_interface.js';
import express, { Router } from 'express';

abstract class BaseRoutes implements IRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }
    
    abstract routes(): void;
}

export default BaseRoutes;