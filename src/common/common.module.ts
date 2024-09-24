import { Module } from '@nestjs/common';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { AllExceptionsFilter, ValidationExceptionFilter } from './errors/exception-filters';
import { LoggerService } from './services';
import { ExceptionHandlerService } from './services/exception-handler.service';


@Module({
    providers: [
        AllExceptionsFilter,
        ValidationExceptionFilter,
        ExceptionHandlerService,
        LoggerService,
        {
            provide: 'ALL_EXCEPTIONS_FILTER',
            useClass: AllExceptionsFilter,
          },
          {
            provide: 'VALIDATION_EXCEPTION_FILTER',
            useClass: ValidationExceptionFilter,
          },
          {
            provide: 'ILoggerService',
            useClass: LoggerService,
          },
    ],
    imports: [
        InterceptorsModule
    ],
    exports: [
        InterceptorsModule,
        'ALL_EXCEPTIONS_FILTER',
        'VALIDATION_EXCEPTION_FILTER',
        'ILoggerService',
        ExceptionHandlerService,
        AllExceptionsFilter,
        ValidationExceptionFilter,
        LoggerService
    ]
})

export class CommonModule {}
