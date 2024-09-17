import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { User } from '../users/entities/users.entity';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Permission } from 'src/users/entities';
import { Tokens, UserRole } from 'src/common/enums';
import { IUserService } from 'src/users/interfaces/user-service.interface';
import { USERS_URL } from 'src/common/utilities/api-url.utility';
import { IConfirmationRegisterService } from 'src/mail-sender/interfaces/confirmation-register-service.interface';
import { Token } from 'src/tokens/entities/token.entity';
import { ITokenService } from 'src/tokens/interfaces/token-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @Inject('IUserService')
    private readonly usersService: IUserService,
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('IConfirmationRegisterService')
    private readonly confirmationRegisterService: IConfirmationRegisterService,
    private readonly jwtService: JwtService,

  ) { }

  @CatchErrors()
  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      select: ['id', 'isVerified']
    });

    if(userExists && userExists.isVerified) 
      throw new UnauthorizedException('User already exists');

    if (userExists) 
      await this.userRepository.delete(userExists.id);
    
    const { password, ...userData } = createUserDto;

    const salt = bcrypt.genSaltSync();
    const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, salt),
    });
    await this.userRepository.save(user);
    const token = await this.tokenService.createToken(user, Tokens.REGISTER);
    
    const verificationUrl = `${USERS_URL}/tokens/verify-email?token=${token}`;
    await this.confirmationRegisterService.sendVerificationEmail(user.email, user.name, verificationUrl);

    return user.id;
  }

  @CatchErrors()
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userPermissions = await this.getPermissionsByUserRole(user.role);
    const payload: JwtPayload = { email: user.email, id: user.id, permisions: userPermissions, role: user.role };
    const token = this.getJwtToken(payload);
    return {
      ...user,
      token,
    }
  }

  @CatchErrors()
  async getPermissionsByUserRole(role: UserRole) {
    const permissions: Permission[] = await this.usersService.getPermissionsByUserRole(role);

    if (!permissions) throw new NotFoundException('Permissions not found');
    return permissions;
  }

  private async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, email: true, id: true, role: true, isVerified: true }
    });
    if (!user)
      return null;
    if (!user.isVerified)
      throw new UnauthorizedException('User not verified');
    const password = user.password
    if (bcrypt.compareSync(pass, password)) {
      const { password, ...result } = user;
      return { email: user.email, id: user.id, role: user.role };
    } else {
      console.log('Password does not match');
      return null;
    }

  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }



}