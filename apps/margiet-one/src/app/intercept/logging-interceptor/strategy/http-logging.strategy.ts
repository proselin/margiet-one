import { LoggingInterceptStrategy } from './logging-intercept-strategy';
import { ExecutionContext, Logger } from '@nestjs/common';
import { CONTEXT_TYPE } from '@/common/constant/handler';

export class HttpLoggingStrategy implements LoggingInterceptStrategy {
  private readonly logger: Logger;
  private readonly uuid: string | number;
  private readonly frsys: string;
  private readonly handlerName: string;
  private readonly contextType: CONTEXT_TYPE;
  private readonly request: any;
  private readonly startTime: number;

  constructor(private readonly context: ExecutionContext) {
    this.logger = new Logger(`Intercept.HttpLogging.${context.getClass().name}`);
    this.startTime = Date.now();

    const request = context.getArgs()[0];
    this.request = request;
    this.uuid = request?.cookies?.['msgid'] ?? this.startTime;
    this.frsys = request?.cookies?.['frsys'] ?? '';
    this.handlerName = context.getHandler()?.name ?? 'Unknown';
    this.contextType = context.getType<CONTEXT_TYPE>();
  }

  private get prefix(): string {
    return `[${this.uuid}:${this.frsys}][${this.handlerName}]:[${this.contextType}]::`;
  }

  logRequestStart(): void {
    this.logger.log(
      `${this.prefix}Request started on ${this.request.method} ${this.request.url} with ` +
      `Params: ${JSON.stringify(this.request.params)}, Body: ${JSON.stringify(this.request.body)}`
    );
  }

  logRequestError(error: unknown): void {
    this.logger.error(
      `${this.prefix}Request error: `,error
    );
  }

  logRequestComplete(): void {
    const duration = Date.now() - this.startTime;
    this.logger.log(
      `${this.prefix}Request completed in ${duration} ms`
    );
  }
}
