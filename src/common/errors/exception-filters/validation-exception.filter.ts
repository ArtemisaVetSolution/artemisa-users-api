import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, Inject } from '@nestjs/common';
import { Response, Request } from 'express';

import { ILoggerService } from 'src/common/interfaces';


@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor( @Inject('ILoggerService') private readonly logger: ILoggerService,) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    if (Array.isArray(exceptionResponse.message)) {
      const formattedErrors = exceptionResponse.message.map((error: string) => {
        const [field, ...rest] = error.split(' ');

        const fieldError: string = field.replace(/"/g, '');
        return {
          field: fieldError.toLowerCase(),
          error: rest.join(' ')
        };
      });

      const errorResponse = {
        statusCode: status,
        error: 'Bad Request',
        message: formattedErrors,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      this.logger.error(JSON.stringify(errorResponse));

      if (!response.headersSent) {
        response.status(status).json(errorResponse);
      } else {
        console.error('Headers already sent for request', request.url);
      }
    } else {
      const errorResponse = {
        ...exceptionResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      this.logger.error(JSON.stringify(errorResponse));

      if (!response.headersSent) {
        response.status(status).json(errorResponse);
      } else {
        console.error('Headers already sent for request', request.url);
      }
    }
  }
}