import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfigService, envValidationSchema } from './common/config/index';
import { LoggerService } from './common/services/index';
// import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';

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
    // CommonModule,
  ],
  providers: [
    LoggerService
  ],
})
export class AppModule {}
