import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { User } from './entities/users.entity';
import { Permission } from './entities/permissions.entity';
import { TokensModule } from 'src/tokens/tokens.module';
import { MailsenderserviceModule } from 'src/mail-sender/mail-sender-service.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([User, Permission]),
  CommonModule,
  MailsenderserviceModule,
  forwardRef(() => TokensModule),
],
  controllers: [UsersController],
  providers: [{
    provide: 'IUserService',
    useClass: UsersService
  },
],
  exports: [
    'IUserService',
    TypeOrmModule
  ],
})
export class UsersModule {}
