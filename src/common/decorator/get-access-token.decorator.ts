import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessTokenPayload } from '../interface/access-token-payload.interface';

export const GetAccessToken = createParamDecorator(
  (data, ctx: ExecutionContext): AccessTokenPayload => {
    const req = ctx.switchToHttp().getRequest();

    return req.tokenPayload as AccessTokenPayload;
  },
);
