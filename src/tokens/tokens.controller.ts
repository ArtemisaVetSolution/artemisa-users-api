import { Response } from 'express';
import { Body, Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { registrationSuccessEmailTemplate } from 'src/mail-sender/emails/registration-success.email.template';
import { ITokenService } from './interfaces/token-service.interface';

@Controller('tokens')
export class TokensController {
  constructor(
    @Inject('ITokenService')
    private readonly tokensService: ITokenService
  ) { }
  
  @Get('verify-email')
  async verify(@Query('token') token: string, @Res() res: Response) {
    try {
      const tokenVerified = await this.tokensService.verifyTokenConfirmationEmail(token);
      if (!tokenVerified) {
        return res.status(400).json({ message: 'Error verifying user' });
      }
   
      const htmlContent = registrationSuccessEmailTemplate();
      return res.status(200).send(htmlContent).type('html');
      
    } catch (error) { 
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error verifying user', error: error.message });
      }
    }

  }

  @Get('change-password')
  async changePassword(@Query('token') token: string, @Body()newPassword: string, @Res() res: Response) {
    try {
      const tokenVerified = await this.tokensService.verifiTokenChangePassworg(token, newPassword);
      if (!tokenVerified) {
        return res.status(400).json({ message: 'Error changing password' });
      }
   
      return res.status(200).json({ message: 'Password changed successfully' });
      
    } catch (error) { 
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error changing password', error: error.message });
      }
    }

  }

}


