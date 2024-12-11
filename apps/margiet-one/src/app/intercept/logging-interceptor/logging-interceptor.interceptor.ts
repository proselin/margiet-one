import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { CONTEXT_TYPE } from '@/common/constant/handler';
import { HttpLoggingStrategy } from './strategy/http-logging.strategy';
import { LoggingInterceptStrategy } from './strategy/logging-intercept-strategy';
import { GraphqlLoggingStrategy } from './strategy/graphql-logging.strategy';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const loggerStrategy = this.getLoggerStrategy(context);
    loggerStrategy.logRequestStart();
    return next.handle().pipe(
      tap({
        next: () => loggerStrategy.logRequestComplete(),
        error: (err) => loggerStrategy.logRequestError(err),
      })
    );
  }

  private getLoggerStrategy(context: ExecutionContext): LoggingInterceptStrategy {
    switch (context.getType<CONTEXT_TYPE>()) {
      case CONTEXT_TYPE.GraphQL:
        return new GraphqlLoggingStrategy(context);
      case CONTEXT_TYPE.HTTP:
      case CONTEXT_TYPE.WS:
      case CONTEXT_TYPE.RPC:
      default:
        return new HttpLoggingStrategy(context);
    }
  }

}
