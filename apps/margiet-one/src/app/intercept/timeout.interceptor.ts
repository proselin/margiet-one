import {
  CallHandler,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

import { EnvName } from '../common';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {

  constructor(private configService: ConfigService) { }

  timeout = this.configService.getOrThrow(EnvName.SERVER_TIMEOUT)

  intercept(_: unknown, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeout),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
