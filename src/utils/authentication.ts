import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static passwordCompare = (password: string, hashedPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, hashedPassword);
    }


    public static generateToken = (id: number, name: string, email: string, image: string): string => {
        const secretKey: string = process.env['JWT_SECRET_KEY'] || "secret";
        const token: string = jwt.sign(
            {
                id, name, email, image
            }, 
            secretKey,
            {
                expiresIn: "24h"
            }
        );

        return token;
    }

    public static generateTokenForResetPW = (id: number, email: string, secret: string): string => {
        const secretKey: string = secret
        const token: string = jwt.sign({id, email}, secretKey, {expiresIn: '15m'});
        return token;
    }

    public static verifiyJwtForResetPw = (token: string, secret: string): string | object => {
        const result = jwt.verify(token, secret);
        return result;
    }
}

export default Authentication;