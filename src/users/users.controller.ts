import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly usersService: IUserService
  ) {}


  @Get(':id')
  @CatchErrors()
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get()
  @CatchErrors()
  findAll() {
    return this.usersService.findAllUsers();
  }

}



