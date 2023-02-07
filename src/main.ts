import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

const DEFAULT_PORT = '4000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(
      'Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!',
    )
    .addTag('NestJS')
    .addServer(`http://localhost:${env.PORT ?? DEFAULT_PORT}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(env.PORT ?? DEFAULT_PORT);
}
bootstrap();
