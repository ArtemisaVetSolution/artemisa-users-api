import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { User } from '../users/entities/users.entity';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Permission } from 'src/users/entities';
import { UsersService } from '../users/users.service';
import { UserRole } from 'src/common/enums';
import { log } from 'console';
import { IUserService } from 'src/users/interfaces/user-service.interface';


@Injectable()
export class AuthService implements IAuthService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('IUserService')
    private readonly usersService: IUserService
  ) {}

  @CatchErrors() 
  async register(createUserDto: CreateUserDto) {
  const { password, ...userData } = createUserDto;

  const salt = bcrypt.genSaltSync();
  const user = this.userRepository.create({
      ...userData,
      password: bcrypt.hashSync(password, salt),
  });

    await this.userRepository.save(user);
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

  
  async validateUser(email: string, pass: string): Promise<any> {
  
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, email: true, id: true, role: true} });
    if (!user) {
      console.log('User not found');
      return null;
    }
    
    const password = user.password
    if (bcrypt.compareSync(pass, password)) {
      const { password, ...result } = user;
      return {email: user.email, id: user.id, role: user.role};
    } else {
      console.log('Password does not match');
      return null;
    }
  
  }
  
  private getJwtToken( payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}