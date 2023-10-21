import { Request, Response, NextFunction } from "express";
import {check, validationResult} from "express-validator";

export const validatePassword = [
    check('password').isLength({min: 6}),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]