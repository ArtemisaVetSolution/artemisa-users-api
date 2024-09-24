import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { CreateUserDto, LoginUserDto, RegisterResponseDto } from './dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { ApiDocLoginUser, ApiDocRegisterUser } from './decorators/auth-swagger.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { ILoggerService } from 'src/common/interfaces';



@CatchErrors()
@ApiTags('Auth')
@ApiExtraModels(RegisterResponseDto, LoginResponseDto)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
  private readonly authService: IAuthService,
  private readonly exceptionHandlerService: ExceptionHandlerService,
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
) { }

  @ApiDocRegisterUser(RegisterResponseDto)
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiDocLoginUser(LoginResponseDto)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-jwt')
  validateJwt(): { valid: boolean } {
    return { valid: true };

  }

}
