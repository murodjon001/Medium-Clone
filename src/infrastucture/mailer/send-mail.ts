import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class SendEmail {
  async sendResetPasswordInstructions(email: string, code: string) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Instructions for resetting the password',
      text: `You can reset your password through this ${code} code!`,
    });
  }

  async sendVerificationEmail(email: string, code: string) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Verification Code',
      text: `Your verification code: ${code}`,
    });
  }
}
