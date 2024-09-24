import { Injectable } from '@nestjs/common';
import { verificationRegisterEmailTemplate } from '../../mail-sender/emails/verification-register.email.template';
import { MailConfig } from '../config/email.config';
import { ConfigService } from '@nestjs/config';
import { IConfirmationRegisterService } from '../../mail-sender/interfaces/confirmation-register-service.interface';


@Injectable()
export class MailSenderService extends MailConfig implements IConfirmationRegisterService{
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
