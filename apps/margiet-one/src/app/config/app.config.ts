import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingInterceptor, TimeoutInterceptor } from '../intercept';
import { AppModule } from '../app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { EnvName, NODE_ENV } from '../common';
import cookieParser from 'cookie-parser';
import { CsrfMiddleware } from '../middlewares/double-csrf';
import compression from 'compression';

export async function InitApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const config = app.get<ConfigService>(ConfigService);

  app.use(cookieParser());

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalInterceptors(app.get(LoggingInterceptor));

  app.useGlobalInterceptors(app.get(TimeoutInterceptor));

  app.setGlobalPrefix(config.get<string>(EnvName.SERVER_PREFIX));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'V1',
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    })
  );
  if (config.get(EnvName.NODE_ENV) === NODE_ENV.PRODUCTION) {
    app.use(app.get(CsrfMiddleware).use);
  }
  app.use(compression());

  app.enableShutdownHooks();

  return app;
}
