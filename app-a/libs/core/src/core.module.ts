import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { GeorgeExceptionFilter } from './filters/george-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: GeorgeExceptionFilter,
    },
  ],
  exports: [PrismaService],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
