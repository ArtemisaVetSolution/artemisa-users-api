import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokensController } from './tokens.controller';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30m' },
      }),
    }),
    forwardRef(() => UsersModule),

],
  controllers: [TokensController],
  providers: [{
    provide: 'ITokenService',
    useClass: TokensService,
  }],
  exports: [
    TypeOrmModule,
    'ITokenService'
  ],
})
export class TokensModule {}
