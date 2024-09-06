import { Injectable } from "@nestjs/common";
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ILoggerService } from "../interfaces/index";

@Injectable()
export class LoggerService implements ILoggerService{
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.txt',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
          format: winston.format.combine(
            winston.format.printf(({ timestamp, level, message }) => {
              let logMessage: { method?: any; path?: any; message: any; clientIp?: any; };
              try {
                logMessage = JSON.parse(message);
              } catch (e) {
                logMessage = { message };
              }
              return `${timestamp} [${level.toUpperCase()}]:
              \nMethod: ${logMessage.method || 'N/A'}
              \nPath: ${logMessage.path || 'N/A'}
              \nMessage: ${logMessage.message}
              \nClient IP: ${logMessage.clientIp || 'N/A'}`;
            })
          ),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
          format: winston.format.printf(
            ({ timestamp, level, message }) => {
              return `${timestamp} ${level} ${message}`;
            }
          ),
        }),
        new winston.transports.Console()
      ]
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}