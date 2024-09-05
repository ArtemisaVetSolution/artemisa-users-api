import { Logger, HttpException } from '@nestjs/common'
// import { LoggerService } from '../services/logger.service';
// import { ExceptionHandlerService } from '../services/exception-handler.service';

// export function CatchErrors() {
//   return function (constructor: Function) {
//     const originalMethods = Object.getOwnPropertyNames(constructor.prototype)
//       .filter(method => method !== 'constructor')
//       .map(method => ({
//         name: method,
//         descriptor: Object.getOwnPropertyDescriptor(constructor.prototype, method)
//       }));

//     for (const { name, descriptor } of originalMethods) {
//       if (descriptor && typeof descriptor.value === 'function') {
//         const originalMethod = descriptor.value;

//         descriptor.value = async function (...args: any[]) {
//           const exceptionHandlerService = new ExceptionHandlerService();
//           const loggerService = new LoggerService();
//           const className = constructor.name;

//           try {
//             return await originalMethod.apply(this, args);
//           } catch (error) {
//             loggerService.error(
//               `Error in ${className}.${name}: ${error.message}`,
//             );

//             const httpException = exceptionHandlerService.handleDatabaseError(error);
//             throw httpException;
//           }
//         };

//         Object.defineProperty(constructor.prototype, name, descriptor);
//       }
//     }
//   };
// }

export function LogClass(): ClassDecorator {
  return (target: any) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      const method = target.prototype[propertyName];
      if( typeof method === 'function' && propertyName !== 'constructor'){
        target.prototype[propertyName] = async function (...args: any[]) {
          try {
            Logger.log(`Before ${propertyName} method with args ${args}`);
            const result = await method.apply(this, args);
            return result;
          }
          catch (error) {
            Logger.error(`Error in ${propertyName} method: ${error.message}`);
            throw new HttpException('Internal server error', 500);
          }
        }
      }
    }
  }
}

// import { Injectable, Logger, Inject, BadRequestException } from '@nestjs/common';
// import { ExceptionHandlerService } from '../services/exception-handler.service';
// import { LoggerService } from '../services';

// @Injectable()
// export class CatchErrorsDecorator {
//   constructor(
//     private readonly loggerService: LoggerService,
//     private readonly exceptionHandlerService: ExceptionHandlerService,
//   ) {}

//   decorate(target: any) {
//     const originalMethods = Object.getOwnPropertyNames(target.prototype)
//       .filter(method => method !== 'constructor')
//       .map(method => ({
//         name: method,
//         descriptor: Object.getOwnPropertyDescriptor(target.prototype, method),
//       }));

//     for (const { name, descriptor } of originalMethods) {
//       if (descriptor && typeof descriptor.value === 'function') {
//         const originalMethod = descriptor.value;

//         descriptor.value = async (...args: any[]) => {
//           try {
//             return await originalMethod.apply(this, args);
//           } catch (error) {
//             this.loggerService.error(`Error in ${target.name}.${name}: ${error.message}`);
//             const httpException = this.exceptionHandlerService.handleDatabaseError(error);
//             throw new BadRequestException(httpException);
//           }
//         };

//         Object.defineProperty(target.prototype, name, descriptor);
//       }
//     }
//   }
// }
