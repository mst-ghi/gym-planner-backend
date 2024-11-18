import { Injectable } from '@nestjs/common';
import { Template } from './template';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;
  private template;

  constructor(private readonly configs: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configs.get<string>('mail.host'),
      port: this.configs.get<string>('mail.port'),
      secure: false, // true for 465, false for other ports
      ignoreTLS: true,
      requireTLS: false,
      auth: {
        user: this.configs.get<string>('mail.user'), // generated ethereal user
        pass: this.configs.get<string>('mail.pass'), // generated ethereal password
      },
    });

    this.template = new Template();
  }

  async sendCode(to: string, code: string | number) {
    await this.transporter.sendMail({
      from: `"John from active gym" <${this.configs.get<string>('mail.user')}>`, // sender address
      to: to, // list of receivers
      subject: 'Digit code', // Subject line
      html: this.template.codeTemplate(code, this.configs.get<string>('otp.ttl')), // html body
    });
  }
}
