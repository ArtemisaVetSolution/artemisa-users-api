import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { Tokens, UserRole } from 'src/common/enums';
import { Permission, User } from './entities';
import { ITokenService } from 'src/tokens/interfaces/token-service.interface';
import { FRONT_URL } from 'src/common/utilities/api-url.utility';

import { IForgotPasswordService } from 'src/mail-sender/interfaces/forgot-password-service.interface';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { ILoggerService } from 'src/common/interfaces';

@CatchErrors()
@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('IForgotPasswordService')
    private readonly forgotPasswordService: IForgotPasswordService,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
  ) { }


  async findUserById(id: string) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async getPermissionsByUserRole(role: UserRole) {
    const permissions: Permission[] = await this.permissionRepository.findBy({ role });
    if (!permissions) throw new NotFoundException('Permissions not found');
    return permissions;
  }

  async forgotPasswordRequest(email: string) {
    console.log("email del usuario", email);
    const user: User = await this.userRepository.createQueryBuilder("user")
        .addSelect("user.isVerified")
        .where("user.email = :email", { email })
        .getOne();
    
    if (!user) throw new NotFoundException('User not found');

    if (user.isVerified) {
      const token = await this.tokenService.createToken(user, Tokens.RESET_PASSWORD);
      const verificationUrl = `${FRONT_URL}/recover-password-new-pass?token=${token}`;
      await this.forgotPasswordService.sendForgotPasswordEmail(user.email, user.name, verificationUrl);
    } else {
      throw new NotFoundException('User not verified');

    }

  }
}
