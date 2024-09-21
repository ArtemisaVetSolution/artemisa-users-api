import { Controller, Get, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe, Catch } from '@nestjs/common';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { ApiDocGetAllUsers, ApiDocGetUserById } from './decorators/users-swagger.decorator';
import { Leaves, Path } from 'src/common/enums';
import { PathName, VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';
import { User } from './decorators/user-payload-param.decorator';
import { JwtPayload } from 'src/auth/interfaces';



@CatchErrors()
@ApiTags('Users')
@ApiExtraModels(GetUserResponseDto)
@PathName(Path.USERS)
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly usersService: IUserService
  ) {}
  
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

  @VerifyAuthService(Leaves.CAN_UPDATE)
  @Patch('change-password')
  changePasswordUserRequest(@User() user: JwtPayload) {
    return this.usersService.forgotPasswordRequest(user.id);
  }

}



