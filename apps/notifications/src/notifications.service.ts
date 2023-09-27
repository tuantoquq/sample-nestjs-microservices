import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly sourceEmail = this.configService.get('EMAIL_USERNAME');
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.sourceEmail,
      pass: this.configService.get('EMAIL_PASSWORD'),
    },
  });
  async notifyEmail({ email, message }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: `Striper Payments <${this.sourceEmail}>`,
      to: email,
      subject: 'Reservation confirmed',
      text: message,
    });
    return;
  }
}
