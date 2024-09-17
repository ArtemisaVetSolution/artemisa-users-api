import { Controller, Get, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { ApiDocGetAllUsers, ApiDocGetUserById } from './decorators/users-swagger.decorator';
import { Leaves, Path } from 'src/common/enums';
import { PathName, VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';
import { User } from './decorators/user-payload-param.decorator';
import { JwtPayload } from 'src/auth/interfaces';




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
  @CatchErrors()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findUserById(id);
  }

  @VerifyAuthService(Leaves.CAN_READ)
  @ApiDocGetAllUsers(GetUserResponseDto)
  @Get()
  @CatchErrors()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @VerifyAuthService(Leaves.CAN_UPDATE)
  @Patch('change-password')
  @CatchErrors()
  changePasswordUserRequest(@User() user: JwtPayload) {
    return this.usersService.forgotPasswordRequest(user.id);
  }

}



