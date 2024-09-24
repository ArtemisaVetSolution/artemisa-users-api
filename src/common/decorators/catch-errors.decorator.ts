  import { Injectable, HttpException } from '@nestjs/common';
  import { LoggerService } from '../services/logger.service';
  import { ExceptionHandlerService } from '../services/exception-handler.service';

  export function CatchErrors() {
    return function (constructor: Function) {
      const originalMethods = Object.getOwnPropertyNames(constructor.prototype)
        .filter(method => method !== 'constructor')
        .map(method => ({
          name: method,
          descriptor: Object.getOwnPropertyDescriptor(constructor.prototype, method),
        }));

      for (const { name, descriptor } of originalMethods) {
        if (descriptor && typeof descriptor.value === 'function') {
          const originalMethod = descriptor.value;

          const metadataKeys = Reflect.getMetadataKeys(originalMethod);
          const metadata = metadataKeys.map(key => ({ key, value: Reflect.getMetadata(key, originalMethod) }));

          descriptor.value = async function (...args: any[]) {
            const exceptionHandlerService: ExceptionHandlerService = this.exceptionHandlerService;
            const loggerService: LoggerService = this.loggerService;
            const className = constructor.name;

            try {
              const result = await originalMethod.apply(this, args);
              return result;
            } catch (error) {
              console.log("error desde decorator", error);

              if (!exceptionHandlerService) {
                console.error('ExceptionHandlerService no está disponible en el contexto');
              }
              if (!loggerService) {
                console.error('LoggerService no está disponible en el contexto');
              }


              loggerService.error(`Error in ${className}.${name}: ${error.message}`);

              const handledError = exceptionHandlerService.handleDatabaseError(error);

              throw handledError instanceof HttpException ? handledError : new HttpException(error.message || 'Internal server error desde aqui', 500);
            }
          };

          metadata.forEach(({ key, value }) => {
            Reflect.defineMetadata(key, value, descriptor.value);
          });

          Object.defineProperty(constructor.prototype, name, descriptor);
        }
      }
    };
  }


  