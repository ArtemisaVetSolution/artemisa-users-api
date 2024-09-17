import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfigService, envValidationSchema } from './common/config/index';
import { LoggerService } from './common/services/index';
import { UsersModule } from './users/users.module';
import { AllExceptionsFilter, ValidationExceptionFilter } from './common/errors/exception-filters';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsSeeder, SeederRunner, UsersSeeder } from './common/seeders';
import { MailsenderserviceModule } from './mail-sender/mail-sender-service.module';
import { TokensModule } from './tokens/tokens.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService
    }),
    UsersModule,
    InterceptorsModule,
    CommonModule,
    AuthModule,
    MailsenderserviceModule,
    TokensModule,
  ],
  providers: [
    UsersSeeder,
    PermissionsSeeder,
    SeederRunner,
    LoggerService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
    {
      provide: 'APP_FILTER',
      useClass: ValidationExceptionFilter,
    },
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
  ],
})
export class AppModule  implements OnModuleInit{
  constructor(
    private readonly seederRunner: SeederRunner,
    private configService: ConfigService
  ){}

  async onModuleInit(){
    Logger.log('AppModule initialized. Seeding database...');
    const executedSeeders = this.configService.get<string>('EXECUTE_SEEDERS');
    if(executedSeeders === 'true'){
      Logger.log('Executing seeders...');
      await this.seederRunner.runSeeds();
    }else{
      Logger.log('Seeders execution skipped.');
    }

    
  }

}
