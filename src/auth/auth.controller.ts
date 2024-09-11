import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Req } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { CreateUserDto, LoginUserDto, RegisterResponseDto} from './dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { ApiDocLoginUser, ApiDocRegisterUser } from './decorators/auth-swagger.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@ApiTags('Auth')
@ApiExtraModels(RegisterResponseDto, LoginResponseDto)
@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService')
  private readonly authService: IAuthService) {}

  @ApiDocRegisterUser(RegisterResponseDto)
  @Post('register')
  @CatchErrors()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiDocLoginUser(LoginResponseDto)
  @Post('login')
  @CatchErrors()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-jwt')
  @CatchErrors()
  validateJwt(): { valid: boolean } {
    return { valid: true };

  }



}
