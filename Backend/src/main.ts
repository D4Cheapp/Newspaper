import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const start = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MedKids API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, documentFactory, {
    jsonDocumentUrl: '/api/swagger-json',
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(4000, () => console.log(`Server started on port 4000`));
};

start();
