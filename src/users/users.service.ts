import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { Tokens, UserRole } from 'src/common/enums';
import { Permission, User } from './entities';
import { ITokenService } from 'src/tokens/interfaces/token-service.interface';
import { USERS_URL } from 'src/common/utilities/api-url.utility';

import { IForgotPasswordService } from 'src/mail-sender/interfaces/forgot-password-service.interface';

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
  ) {}

  // @CatchErrors()
  async findUserById(id: string) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // @CatchErrors()
  async findAllUsers() {
    return await this.userRepository.find();
  }

  // @CatchErrors()
  async getPermissionsByUserRole(role: UserRole){
    const permissions: Permission[] = await this.permissionRepository.findBy({ role });    
    if (!permissions) throw new NotFoundException('Permissions not found');
    return permissions;
  }

  //Continuar cuando se pueda implementar el front
  // @CatchErrors()
  async forgotPasswordRequest(id: string){
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const token = await this.tokenService.createToken(user, Tokens.RESET_PASSWORD);
    const verificationUrl = `${USERS_URL}/Aqui-debe-ir-la-url-del-front=${token}`;
    await this.forgotPasswordService.sendForgotPasswordEmail(user.email, user.name, verificationUrl);
    
  }

}
