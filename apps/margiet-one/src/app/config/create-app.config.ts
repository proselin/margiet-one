import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingInterceptor, TimeoutInterceptor } from '@/intercept';
import { AllExceptionsFilter } from '@/exception';
import { type AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { doubleCsrfUtilities } from '@/double-csrf.config';
import helmet from 'helmet';

export async function createApp(appModule: AppModule) {
  const app = await NestFactory.create<NestExpressApplication>(appModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalInterceptors(new LoggingInterceptor());

  // app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'V1',
  });

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));

  const {
    doubleCsrfProtection, // This is the default CSRF protection middleware.
  } = doubleCsrfUtilities;
  app.use(doubleCsrfProtection);

  app.enableShutdownHooks();

  app.useGlobalFilters(new AllExceptionsFilter());
  return app;
}
