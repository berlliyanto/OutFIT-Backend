import nodemailer from "nodemailer";
import { google } from "googleapis";

class Mailer {
  private oAuth2Client;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env["CLIENT_ID"],
      process.env["CLIENT_SECRET"],
      process.env["REDIRECT_URI"]
    );
    this.oAuth2Client.setCredentials({
      refresh_token: process.env["REFRESH_TOKEN"],
    });
  }

  public async sendMailResetPassword(to: string, text: string) {
    try {
      const accessToken: any = await this.oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "ecoutfit4@gmail.com",
          clientId: process.env["CLIENT_ID"],
          clientSecret: process.env["CLIENT_SECRET"],
          refreshToken: process.env["REFRESH_TOKEN"],
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: "OutFit System <ecoutfit4@gmail.com>",
        to: to,
        subject: `Link reset password for ${to}`,
        html: `<div>We have received your request to reset your password. To proceed with the reset process, please click the following link:</div>
        <br><br> 
        <a href=${text}>${text}</a>. 
        <br><br>
        <div>If you didn't request this password reset, you can safely ignore this message. Thank you</div>`,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
}

const mailer = new Mailer();
export default mailer;
