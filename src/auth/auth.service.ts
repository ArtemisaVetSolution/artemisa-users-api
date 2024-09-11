import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { User } from '../users/entities/users.entity';
import { IAuthService } from './interfaces/auth-service.interface';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService implements IAuthService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
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
    console.log('Login data:', email, password);  

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email, id: user.id };
    console.log('JWT Payload:', payload); 
    const token = this.getJwtToken(payload);
    return {
      ...user,
      token,
    }
  }

  
  async validateUser(email: string, pass: string): Promise<any> {
  
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, email: true, id: true} });
    if (!user) {
      console.log('User not found');
      return null;
    }
    
    const password = user.password
    if (bcrypt.compareSync(pass, password)) {
      const { password, ...result } = user;
      return {email: user.email, id: user.id};
    } else {
      console.log('Password does not match');
    }
  
    return null;
  }
  
  private getJwtToken( payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    console.log('Signing JWT with payload:', payload); 
    console.log(token);
    
    return token;
  }


}