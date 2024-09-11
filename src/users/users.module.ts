import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { User } from './entities/users.entity';
import { Permission } from './entities/permissions.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([Permission]),
  CommonModule],
  controllers: [UsersController],
  providers: [{
    provide: 'IUserService',
    useClass: UsersService
  },
  UsersService
],
  exports: [
    {
      provide: 'IUserService',
      useClass: UsersService,
    },
    UsersService,
    TypeOrmModule
  ],
})
export class UsersModule {}
