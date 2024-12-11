import { createApp } from '@/config/create-app.config';
import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { DEFAULT, EnvName } from '@/common';
import { SwaggerConfig } from '@/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await createApp(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get(EnvName.SERVER_PORT, DEFAULT.SERVER_PORT);
  const host = configService.get(EnvName.SERVER_HOST, DEFAULT.SERVER_HOST);
  const prefix = configService.get(
    EnvName.SERVER_PREFIX,
    DEFAULT.SERVER_PREFIX,
  );
  const swaggerPrefix = configService.get(
    EnvName.SERVER_API_DOCUMENT_PREFIX,
    DEFAULT.SERVER_API_DOCUMENT_PREFIX,
  );
  app.setGlobalPrefix(prefix);
  SwaggerConfig.setupOpenApi(app, {});
  app.listen(port, host, () => {
    Logger.log('🚀 Application is running on: ' + host + ":" + port);
    Logger.log(' Swagger is running on: ' +  host + ":" + port + swaggerPrefix);
  });

}

bootstrap();
