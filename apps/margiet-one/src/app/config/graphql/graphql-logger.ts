import { Logger } from '@nestjs/common';

export class GraphQLLogger extends Logger {
  info(...agr : Parameters<Logger['log']>) {
    super.log(...agr)
  }
}
