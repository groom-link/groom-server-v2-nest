import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WinstonLogger } from '@app/config/winston-singleton.config';
import { JwtPassConfig } from '@app/config/jwt-pass.config';
import { ResMessage } from '@app/common/enum/res-message.enum';
import { TokenService } from '@app/module/auth/service/token.service';
import { TokenType } from '@app/common/enum/token-type.enum';
import { AccessTokenPayload } from '../interface/access-token-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (JwtPassConfig.urls.includes(request.path)) {
      return true;
    }

    const bearerToken: string = request.headers.authorization;

    if (!bearerToken) {
      throw new HttpException(
        ResMessage.NO_TOKEN_INFORMATION,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken: string = bearerToken.replace('Bearer ', '');
    request.tokenPayload = this.tokenService.validateToken(
      accessToken,
      TokenType.ACCESS_TOKEN,
    ) as AccessTokenPayload;

    WinstonLogger.debug(request.tokenPayload, JwtAuthGuard.name);

    return true;
  }
}
