import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Token } from './entities/token.entity';
import { User } from 'src/users/entities';
import { Tokens } from 'src/common/enums';
import { JwtPayloadEmail } from 'src/auth/interfaces/jwt-payload-email.interface';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { ITokenService } from './interfaces/token-service.interface';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { ILoggerService } from 'src/common/interfaces';

@CatchErrors()
@Injectable()
export class TokensService implements ITokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
  ) { }

  async createToken(userId: User, type: Tokens): Promise<string> {
    const payload: JwtPayloadEmail = { userId: userId.id, type};
    const tokenString = await this.getJwtToken(payload);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    const token = this.tokenRepository.create({
      token: tokenString,
      user: userId,
      type,
      expiresAt
    });

    this.tokenRepository.save(token);
    return tokenString;
  }

  async verifyTokenConfirmationEmail(tokenString: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.findOne({ where: { token: tokenString }, relations: ['user'] });
    if (!tokenEntity) 
      throw new NotFoundException('Token not found');

    if (tokenEntity.isUsed)
      throw new BadRequestException('Token already verified');

    if (tokenEntity.expiresAt < new Date())
      throw new BadRequestException('Token expired');

    tokenEntity.isUsed = true;
    await this.tokenRepository.save(tokenEntity);
    
    await this.userRepository.update(tokenEntity.user.id, { isVerified: true });
    
    return true;
    
  };

  async verifiTokenChangePassworg (tokenString: string, newPassword: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.findOne({ where: { token: tokenString }, relations: ['user'] });
    if (!tokenEntity) 
      throw new NotFoundException('Token not found');

    if (tokenEntity.isUsed)
      throw new BadRequestException('Token already verified');

    if (tokenEntity.expiresAt < new Date())
      throw new BadRequestException('Token expired');

    tokenEntity.isUsed = true;
    await this.tokenRepository.save(tokenEntity);
    
    const salt = bcrypt.genSaltSync();

    const password = bcrypt.hashSync(newPassword, salt);
    await this.userRepository.update(tokenEntity.user.id, { password });
    
    return true;
  }



  private async getJwtToken(payload: JwtPayloadEmail): Promise <string> {
    const token = await this.jwtService.sign(payload, { expiresIn: '30m' });
    return token;
  }

}
