import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ExceptionHandlerService {
  handleDatabaseError(error: any): HttpException {
    switch (error.code) {
      case '23505': // Clave duplicada
        return new HttpException('Duplicate key error', HttpStatus.CONFLICT);
      case '22P02': // Sintaxis inválida
        return new HttpException('Invalid input syntax', HttpStatus.BAD_REQUEST);
      case '23503': // Violación de clave foránea
        return new HttpException('Foreign key violation', HttpStatus.BAD_REQUEST);
      case '23502': // Violación de NOT NULL
        return new HttpException('Null value violation', HttpStatus.BAD_REQUEST);
      case '23514': // Violación de CHECK
        return new HttpException('Check constraint violation', HttpStatus.BAD_REQUEST);
      case '42601': // Error de sintaxis
        return new HttpException('Syntax error', HttpStatus.BAD_REQUEST);
      case '42703': // Columna indefinida
        return new HttpException('Undefined column error', HttpStatus.BAD_REQUEST);
      case '23504': // Violación de restricción UNIQUE
        return new HttpException('Unique constraint violation', HttpStatus.CONFLICT);
      case '40001': // Deadlock detectado
        return new HttpException('Deadlock detected, try again later', HttpStatus.CONFLICT);
      case '42883': // Función indefinida
        return new HttpException('Undefined function error', HttpStatus.BAD_REQUEST);
      case '42P01': // Tabla indefinida
        return new HttpException('Undefined table error', HttpStatus.BAD_REQUEST);
      case '08003': // Conexión no existente
        return new HttpException('Connection does not exist', HttpStatus.SERVICE_UNAVAILABLE);
      case '57P03': // Base de datos en modo de recuperación
        return new HttpException('Database in recovery mode, try again later', HttpStatus.SERVICE_UNAVAILABLE);
      default: // Error interno del servidor
        return new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
