import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { load } from 'js-yaml';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { LoggerService } from './logger/logger.service';
import { LogExceptionsFilter } from './logger/log-exception.filter';

dotenv.config();

const DEFAULT_PORT = '4000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new LoggerService();

  app.useLogger(logger);
  app.useGlobalFilters(new LogExceptionsFilter(new HttpAdapterHost(), logger));

  const document = load(
    readFileSync(join(__dirname, '..', 'doc', 'doc.yaml'), 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  await app.listen(env.PORT ?? DEFAULT_PORT);
}

bootstrap();
