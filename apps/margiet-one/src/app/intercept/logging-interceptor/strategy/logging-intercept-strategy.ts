export interface LoggingInterceptStrategy {
  logRequestStart(): void;
  logRequestError(error: unknown): void;
  logRequestComplete(nextValue: any): void;
}
