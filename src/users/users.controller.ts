import { Controller, Get, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe, Post } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetUserResponseDto, EmailDto } from './dto';
import { ApiDocGetAllUsers, ApiDocGetUserById } from './decorators/users-swagger.decorator';
import { Leaves, Path } from 'src/common/enums';
import { PathName, VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';


@ApiTags('Users')
@ApiExtraModels(GetUserResponseDto)
@PathName(Path.USERS)
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly usersService: IUserService
  ) {}

  @Post('change-password')
  changePasswordUserRequest(@Body() emailDto: EmailDto) {
    return this.usersService.forgotPasswordRequest(emailDto.email);
  }

  
  @VerifyAuthService(Leaves.CAN_READ)
  @ApiDocGetUserById(GetUserResponseDto)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findUserById(id);
  }

  @VerifyAuthService(Leaves.CAN_READ)
  @ApiDocGetAllUsers(GetUserResponseDto)
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }


}



