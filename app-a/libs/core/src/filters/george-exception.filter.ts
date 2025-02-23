/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BaseExceptionFilter } from '@nestjs/core';
import { GeorgeLogger, LogContext } from '../logger/george.logger';
import { ArgumentsHost, HttpException } from '@nestjs/common';

export class GeorgeExceptionFilter extends BaseExceptionFilter {
  logger: GeorgeLogger;

  constructor() {
    super();
    this.logger = new GeorgeLogger('GeorgeExceptionsFilter');
  }

  catch(exception: Error, host: ArgumentsHost) {
    this.catchHttp.bind(this)(exception, host);
  }

  catchHttp(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const type = host.getType();
    const response = http.getResponse();

    const metadata: LogContext = {
      response: {
        statusCode: response && response.statusCode,
        statusMessage: response && response.message,
      },
    };

    const tags = {
      transaction_type: type,
    };

    if (!(exception instanceof Error)) {
      // To catch all not Error exception

      this.logger.error('Non Error based error', undefined, {
        contexts: {
          exception: { exception },
          ...metadata,
        },
        tags,
      });
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
      return;
    }

    if (exception instanceof HttpException && exception.getStatus() < 500) {
      super.catch(exception, host);
      return;
    }

    if (exception instanceof HttpException && exception.getStatus() >= 500) {
      this.logger.error(
        exception,
        undefined,
        {
          cause: exception.cause,
          causeStack:
            exception.cause instanceof Error
              ? exception.cause?.stack
              : undefined,
          ...metadata,
          response: {
            response: exception.getResponse(),
            status: exception.getStatus(),
            message: exception.message,
          },
        },
        'HttpExceptionHandler',
      );

      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    this.logger.error(
      exception,
      undefined,
      {
        ...metadata,
      },
      'HttpExceptionHandler',
    );
    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
