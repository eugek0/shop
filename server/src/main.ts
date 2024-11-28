import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from '@app.module';
import { AllExceptionFilter } from '@common/filters/exception.filter';
import { I18nMiddleware, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const logger: Logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('U PROJECT STUDIO API')
    .setDescription('Public documentation for API of "J-PROJECT_STUDIO"')
    .setVersion('v 1.0.0')
    .setLicense('LICENSE', 'http://localhost:5000/docs')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  app.use(I18nMiddleware);

  app.useGlobalPipes(new I18nValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter());

  app.use(express.static(join(__dirname)));

  app.enableCors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: true,
    credentials: true,
  });

  SwaggerModule.setup('docs', app, swaggerDocument, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(port, async () => {
    logger.log(`Server started on port: ${port}`, NestApplication.name);
  });
}

bootstrap();
