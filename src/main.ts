import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupGlobalConfig } from './common/config/global-config';
import { LoggerService } from './common/services';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService)

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  app.enableCors();

  SwaggerConfig(app)
  
  app.setGlobalPrefix('api');
  
  setupGlobalConfig(app, logger);
  await app.listen(port);

  Logger.log(`HTTP server running on port ${port}`, 'Bootstrap');
  
}
bootstrap();
