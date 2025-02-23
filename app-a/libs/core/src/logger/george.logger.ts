import { Logger } from '@nestjs/common';

export type LogMetadata = Record<string, unknown>;
export type LogContext = Record<string, LogMetadata>;

export class GeorgeLogger {
  private readonly logger: Logger;

  constructor(name: string) {
    this.logger = new Logger(name);
  }

  public debug(
    message: string | Record<string, unknown>,
    meta?: LogMetadata,
    context?: string,
  ): void {
    this.logger.debug(this.getWinstonMessage(message, meta), context);
  }

  public log(
    message: string | Record<string, unknown>,
    meta?: LogMetadata,
    context?: string,
  ): void {
    this.logger.log(this.getWinstonMessage(message, meta), context);
  }

  public warn(
    message: string | Record<string, unknown>,
    meta?: LogMetadata,
    context?: string,
  ): void {
    this.logger.warn(this.getWinstonMessage(message, meta), context);
  }

  public error(
    message: string | Error | Record<string, unknown>,
    trace?: string,
    meta?: LogMetadata,
    context?: string,
  ): void {
    const currentTrace: string | undefined =
      !trace && message instanceof Error ? message.stack : trace;
    const msg = this.createErrorMessage(message);
    this.logger.error(this.getWinstonMessage(msg, meta), currentTrace, context);
  }

  private getWinstonMessage(
    message: string | Record<string, unknown>,
    meta?: LogContext | LogMetadata,
  ) {
    const enrichedMeta = this.enrichMeta(meta);
    return enrichedMeta
      ? { message: JSON.stringify(message), ...enrichedMeta }
      : { message: JSON.stringify(message) };
  }

  private createErrorMessage = (
    message: string | Error | Record<string, unknown>,
  ) =>
    message instanceof Error ? `[${message.name}] ${message.message}` : message;

  private enrichMeta = (
    meta?: LogContext | LogMetadata,
  ): LogContext | LogMetadata | undefined => {
    return meta;
  };
}
