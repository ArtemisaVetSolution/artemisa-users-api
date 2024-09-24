import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/users.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { Permission } from 'src/users/entities';
import { CommonModule } from 'src/common/common.module';
import { MailsenderserviceModule } from 'src/mail-sender/mail-sender-service.module';
import { Token } from 'src/tokens/entities/token.entity';
import { TokensModule } from 'src/tokens/tokens.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TokensModule,
    CommonModule,
    MailsenderserviceModule,
    ConfigModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    JwtAuthGuard,
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
