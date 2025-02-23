/* eslint-disable @typescript-eslint/no-floating-promises */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from '@core/core/filters/prisma-exception.filter';
import { GeorgeLogger } from '@core/core/logger/george.logger';
import { createLoggerModule } from '@core/core/logger/utils';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new GeorgeLogger('Main');

  const app = await NestFactory.create(AppModule, {
    logger: createLoggerModule('Nest Commander Demo - API'),
  });

  const config = new DocumentBuilder()
    .setTitle('Nest Commands Demo')
    .setDescription('The Nest Commands Demo API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(helmet());

  const { PORT = 3000 } = process.env;

  await app.listen(PORT, () => {
    logger.log(`App Running at port ${PORT}`);
  });
}

bootstrap();
