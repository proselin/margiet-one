import { Module } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { EnvName, NODE_ENV } from '../../common';

function winstonConfigProduction(
  configService: ConfigService
): winston.LoggerOptions {
  return {
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json() // Use JSON format for structured logging
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          winston.format.ms(),
          winston.format.metadata()
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
      new DailyRotateFile({
        filename: `logs/${configService.get(EnvName.SERVER_NAME)}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d', // Retain logs for 14 days
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
      new DailyRotateFile({
        filename: `logs/${configService.get(
          EnvName.SERVER_NAME
        )}-error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d', // Retain error logs for 30 days
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
    exceptionHandlers: [
      new winston.transports.File({
        filename: `logs/${configService.get(
          EnvName.SERVER_NAME
        )}-exceptions.log`,
      }),
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: `logs/${configService.get(
          EnvName.SERVER_NAME
        )}-rejections.log`,
      }),
    ],
  };
}

function winstonConfigDevelopment(
  configService: ConfigService
): winston.LoggerOptions {
  return {
    transports: [
      new winston.transports.Console({
        debugStdout: true,
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(
            configService.get(EnvName.SERVER_NAME),
            {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }
          )
        ),
      }),
    ],
  };
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (configService.get(EnvName.NODE_ENV) == NODE_ENV.DEVELOPMENT) {
          return winstonConfigDevelopment(configService);
        }
        return winstonConfigProduction(configService);
      },
    }),
  ],
})
export class LoggerConfigModule {}
