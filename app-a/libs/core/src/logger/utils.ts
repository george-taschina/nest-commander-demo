import { format, transports } from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

export declare type WinstonLogLevel = 'info' | 'error' | 'warn' | 'debug' | '';

export const createLoggerModule = (name: string) => {
  const prettyPrint = true;
  const colors = true;

  const combine = [
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.ms(),
    nestWinstonModuleUtilities.format.nestLike(name, { prettyPrint, colors }),
  ];

  return WinstonModule.createLogger({
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(...combine),
      }),
    ],
  });
};
