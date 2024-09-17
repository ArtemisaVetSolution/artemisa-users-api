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
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: JwtPayload): Promise<JwtPayload> {
  
    const user = await this.usersService.findUserById(payload.id)     
  
    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    console.log("user payload", payload);
    
  
    return payload;
  }
}
