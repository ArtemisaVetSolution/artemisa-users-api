import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/users.entity';
import { IUserService } from 'src/users/interfaces/user-service.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IUserService')
    private readonly usersService: IUserService,
    private readonly configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('secret', secret);
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    console.log('payload' ,payload);
    
  
    const user = await this.usersService.findUserById(payload.id)
    console.log('user', user);
    
  
    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
  
    return user;
  }
}
