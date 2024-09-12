import { Injectable } from '@nestjs/common';
import { verificationRegisterEmailTemplate } from '../emails/verification-register.email.template';
import { MailConfig } from '../config/email.config';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MailSenderService extends MailConfig {
  constructor(
    private readonly configService: ConfigService
  ) {
    super();  
  }

  async sendVerificationEmail(email: string, name: string, verificationUrl: string): Promise<void> {
    const mailOptions = {
      from: 'artemisa.vet.solutions@gmail.com',  
      to: email,  
      subject: 'Verificación de correo electrónico',
      html: verificationRegisterEmailTemplate(name, verificationUrl),  
    };

    await this.sendMail(mailOptions);
  }
}
