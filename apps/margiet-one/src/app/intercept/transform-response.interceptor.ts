// import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
// import { Response } from 'express';
// import { Reflector } from '@nestjs/core';
// import { map, Observable } from 'rxjs';
//
// export class TransformInterceptor<T>
//   implements NestInterceptor<T, Response<T>>
// {
//   constructor(private reflector: Reflector) {}
//
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler,
//   ): Observable<Response<T>> {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     return next.handle().pipe(
//       map((data) => ({
//         statusCode: context.switchToHttp().getResponse().statusCode,
//         message:
//           this.reflector.get<string>(
//             'response_message',
//             context.getHandler(),
//           ) || 'success!' + '',
//         data,
//       })),
//     );
//   }
// }

export {}
