import express, { Application, Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";
import compression from 'compression';
import helmet from 'helmet';

import connection from './config/db_connect.js';
import router from './routes/routes.js';
import RoutePath from './routes/routes_name.js';


class App {
    public app: Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.connection();
        this.plugins();
        this.routes();
    }

    private connection(): void {
        connection.getConnection((err, connection) : void => {
            if (err) console.log(err);
            console.log(`Successfully connected to ${connection.config.database}, port : ${connection.config.port}`);
        })
    }

    protected plugins(): void {
        this.app.use(cors({credentials: true}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
    }

    protected routes(): void {
        this.app.use(express.static('public'));
        this.app.use("/api", router);

        this.app.get(RoutePath.DEFAULT, (req: Request, res: Response) => {
            res.send('Hello World');
        });

        this.app.post(RoutePath.DEFAULT, (req: Request, res: Response) => {
            res.send(req.body);
        });
    }
}

const port = process.env['PORT'];
const app = new App().app;

app.listen(port, () => {
    console.log('Server is running on port', port);
});