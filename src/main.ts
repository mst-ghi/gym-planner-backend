import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  SwaggerStarter,
  UseCorsConfig,
  UseGlobalFilters,
  UseGlobalValidationPipe,
  UseMainMiddlewares,
} from '@app/toolkit';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'verbose', 'warn', 'debug', 'fatal'],
  });

  const configs = app.get(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  UseCorsConfig.use(app);
  UseMainMiddlewares.use(app);
  UseGlobalFilters.use(app, process.env.NODE_ENV != 'development');
  UseGlobalValidationPipe.use(app);
  SwaggerStarter.start(app);

  await app.listen(configs.get('app.port'), '0.0.0.0', () => {
    Logger.log(`Application is running on ${configs.get('app.port')}`, 'NestApplication');
  });
}

bootstrap();
