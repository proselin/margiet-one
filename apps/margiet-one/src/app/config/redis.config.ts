import { registerAs } from '@nestjs/config';
import { EnvName } from '@/common';

export default registerAs('redis', () => {
  return {
    connection: {
      host: process.env[EnvName.REDIS_HOST],
      port: +process.env[EnvName.REDIS_PORT],
      password: process.env[EnvName.REDIS_PASSWORD],
      username: process.env[EnvName.REDIS_USERNAME],
    },
  };
});
