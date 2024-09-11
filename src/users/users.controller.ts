import { Controller, Get, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { IUserService } from './interfaces/user-service.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { ApiDocGetAllUsers, ApiDocGetUserById } from './decorators/users-swagger.decorator';
import { PrivateService } from 'src/common/decorators/auth.decorator';



@ApiTags('Users')
@ApiExtraModels(GetUserResponseDto)
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly usersService: IUserService
  ) {}

  @PrivateService()
  @ApiDocGetUserById(GetUserResponseDto)
  @Get(':id')
  @CatchErrors()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findUserById(id);
  }

  @PrivateService()
  @ApiDocGetAllUsers(GetUserResponseDto)
  @Get()
  @CatchErrors()
  findAll() {
    return this.usersService.findAllUsers();
  }

}



