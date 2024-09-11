import { LoggerService } from '../services/logger.service';
import { ExceptionHandlerService } from '../services/exception-handler.service';
import { HttpException } from '@nestjs/common';

class HandledHttpException extends HttpException {
  isHandled: boolean;

  constructor(response: string | object, status: number) {
    super(response, status);
    this.isHandled = false;
  }
}

export function CatchErrors() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const exceptionHandlerService = new ExceptionHandlerService();
      const loggerService = new LoggerService();
      const className = target.constructor.name;

      try {
        return await originalMethod.apply(this, args);
      } catch (error) {

        if (!(error instanceof HandledHttpException) || !error.isHandled) {
          loggerService.error(
            `1. Error in ${className}.${propertyKey}: ${error.message}`,
          );

          const httpException = exceptionHandlerService.handleDatabaseError(error) as HandledHttpException;
          httpException.isHandled = true; 
          throw httpException;
        } else {
          throw error;
        }
      }
    };

    return descriptor;
  };
}