/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { Request, Response } from 'express';
import { LogContext } from '../logger/george.logger';

@Injectable()
export class LoggingMiddleware extends BaseService implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const startTimeStamp = Date.now();

    res.on('finish', () => {
      const time = Date.now() - startTimeStamp;
      const metadata: LogContext = {
        environment: {
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
        },
      };

      const logMessage = `[Request ${req.method} ${req.url} ${res.statusCode} ${time}ms]`;

      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn(logMessage, metadata);
      } else if (res.statusCode >= 500) {
        this.logger.error(logMessage, undefined, metadata);
      } else {
        this.logger.log(logMessage, metadata);
      }
    });

    next();
  }
}
