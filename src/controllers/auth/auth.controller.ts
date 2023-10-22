import { Request, Response } from "express";
import authService from "../../services/auth.service.js";
import UserModel from "../../models/user.model.js";
import Authentication from "../../utils/authentication.js";
import mailer from "../../utils/mailer.js";

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const user = await authService.login(email);
      if (user.length > 0) {
        const userData = user[0];
        const hashedPassword: string = userData.password;
        const compare = await Authentication.passwordCompare(
          password,
          hashedPassword
        );
        if (compare) {
          const token: string = Authentication.generateToken(
            userData.id,
            userData.name,
            userData.email,
            userData.image
          );
          return res.status(200).send({
            user: userData,
            token,
          });
        }
        return res.status(400).send({ msg: "Wrong password" });
      }
      return res.status(400).send({ msg: "Email or Password is Wrong" });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  async register(req: Request, res: Response): Promise<Response> {
    const user: UserModel = req.body;
    const image: string | undefined = req.file?.filename;
    user.image = image;
    const { password } = user;
    const hashedPassword = await Authentication.passwordHash(password);
    user.password = hashedPassword;
    try {
      const response = await authService.register(user);
      return res.send({
        response: response,
        data: req.body,
      });
    } catch (error) {
      return res.send(error);
    }
  }

  async profile(req: Request, res: Response): Promise<Response> {
    const id: number | string = req.params["id"];
    try {
      const response = await authService.profile([id]);
      return res.status(200).send(...response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    const user: UserModel = req.body;
    const image: string | undefined = req.file?.filename;
    image ? (user.image = image) : null;
    const id: number | string = req.params["id"];
    try {
      const response = await authService.updateProfile([user, id]);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      const response = await authService.forgotPassword([email]);
      if (response.length == 0)
        return res.status(404).send({ message: "User not found" });

      const id: number = response[0].id;
      const emailUser: string = response[0].email;
      const password: string = response[0].password;
      const tokenData = Authentication.generateTokenForResetPW(
        id,
        emailUser,
        "JWT_" + password
      );
      const link: string = `http://localhost:5173/reset-password?id=${id}&token=${tokenData}`;
      await mailer.sendMailResetPassword(email, link)
      return res.status(200).send({
        message: "Password reset link has been sent to your email",
      });
    } catch (error) {
      return res.send(error);
    }
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    const { password, password2 } = req.body;

    try {
      const { id, token } = req.params;
      const response = await authService.resetPasswordGetUser([id]);
      if (response.length == 0) return res.send("Invalid Id...");

      const secretKey: string = "JWT_" + response[0].password;
      Authentication.verifiyJwtForResetPw(token, secretKey);

      if (password !== password2) return res.send("Password not equal");
      const passwordHash = await Authentication.passwordHash(password);
      const responseNewPW = await authService.resetPasswordUpdate([
        passwordHash,
        id,
      ]);

      return res.status(200).send(responseNewPW);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

const authController = new AuthController();
export default authController;
