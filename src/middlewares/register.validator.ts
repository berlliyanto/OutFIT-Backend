import { Request, Response, NextFunction } from "express";
import {check, validationResult} from "express-validator";

const validateRegister = [
    check('email').isString(),
    check('password').isLength({min: 6}),
    check('name').isString(),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateRegister;