import { ExecutionContext, Logger } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';

import { LoggingInterceptStrategy } from './logging-intercept-strategy';
import { CONTEXT_TYPE } from '../../../common/constant/handler';

export class GraphqlLoggingStrategy implements LoggingInterceptStrategy {
  private readonly logger: Logger;
  private readonly uuid: string | number;
  private readonly frsys: string;
  private readonly handlerName: string;
  private readonly contextType = CONTEXT_TYPE.GraphQL;
  private readonly startTime: number;
  private readonly operationName: string;
  private readonly variables: Record<string, unknown>;

  constructor(private readonly context: ExecutionContext) {
    this.logger = new Logger(`Intercept.GraphQLLogging.${context.getClass().name}`);
    this.startTime = Date.now();

    const gqlContext = this.context.getArgs()[2]; // GraphQL context (args: [root, args, context, info])
    const request = gqlContext?.req; // Access HTTP request from GraphQL context

    this.uuid = request?.cookies?.['msgid'] ?? this.startTime;
    this.frsys = request?.cookies?.['frsys'] ?? '';

    const info: GraphQLResolveInfo = this.context.getArgs()[3];
    this.handlerName = info?.fieldName ?? 'Unknown';
    this.operationName = info?.operation.operation ?? 'UnnamedOperation';
    this.variables = this.context.getArgs()[1] ?? {}; // GraphQL variables
  }

  private get prefix(): string {
    return `[${this.uuid}:${this.frsys}][${this.handlerName}][${this.operationName}]:[${this.contextType}]::`;
  }

  logRequestStart(): void {
    this.logger.log(
      `${this.prefix}Request started with variables: ${JSON.stringify(this.variables)}`
    );
  }

  logRequestError(error: unknown): void {
    this.logger.error(
      `${this.prefix}Request error: `, error
    );
  }

  logRequestComplete(): void {
    const duration = Date.now() - this.startTime;
    this.logger.log(
      `${this.prefix}Request completed in ${duration} ms`
    );
  }
}
