  //Utilizar esta configuracion para enviar correos con la cuenta de artemisa
  import * as nodemailer from 'nodemailer';
  import { Injectable } from '@nestjs/common';

  export function EnvConfig() {
      return {
        userMail: process.env.USER_MAIL,
        userMailPassword: process.env.USER_MAIL_PASSWORD,
      };
    }

  @Injectable()
  export class MailConfig {
    private transporter: nodemailer.Transporter;

    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EnvConfig().userMail, 
          pass: EnvConfig().userMailPassword,
        },
      });
    }

    public async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
      }
    }
  }


//Utilizar esta configuracion para hacer pruebas con mailtrap
// import * as nodemailer from 'nodemailer';
// import { Injectable } from '@nestjs/common';

// export function EnvConfig() {
//     return {
//         mailHost: process.env.MAIL_HOST,
//         mailPort: process.env.MAIL_PORT,
//         mailUser: process.env.MAIL_USER,
//         mailPassword: process.env.MAIL_PASSWORD,
//     };
// }

// @Injectable()
// export class MailConfig {
//   private transporter: nodemailer.Transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: EnvConfig().mailHost,  // Mailtrap host
//       port: Number(EnvConfig().mailPort),  // Mailtrap port
//       auth: {
//         user: EnvConfig().mailUser,  // Mailtrap user
//         pass: EnvConfig().mailPassword,  // Mailtrap password
//       },
//     });
//   }

//   public async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
//     try {
//       await this.transporter.sendMail(mailOptions);
//       console.log('Email sent successfully');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       throw new Error('Failed to send email');
//     }
//   }
// }
  