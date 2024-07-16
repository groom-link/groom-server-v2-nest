import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { WinstonLogger } from '@app/config/winston-singleton.config';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        WinstonLogger.debug(data);

        return {
          success: true,
          data: Array.isArray(data) ? [...data] : data,
        };
      }),
    );
  }
}
