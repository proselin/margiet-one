import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { InitApp } from './app/config/app.config';
import { SwaggerConfig } from './app/config';
import { DEFAULT, EnvName } from './app/common';

async function bootstrap() {
  const app = await InitApp();
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>(EnvName.SERVER_PORT, DEFAULT.SERVER_PORT);
  const host = configService.get<string>(EnvName.SERVER_HOST, DEFAULT.SERVER_HOST);

  const swaggerPrefix = configService.get<string>(
    EnvName.SERVER_API_DOCUMENT_PREFIX,
    DEFAULT.SERVER_API_DOCUMENT_PREFIX,
  );

  SwaggerConfig.setupOpenApi(app, {});
  const bootstrapLogger = new Logger(bootstrap.name);
  app.listen(port, host, () => {
    bootstrapLogger.log('🚀 Application is running on: ' + host + ":" + port);
    bootstrapLogger.log(' Swagger is running on: ' +  host + ":" + port + swaggerPrefix,);
  });

}

bootstrap();
