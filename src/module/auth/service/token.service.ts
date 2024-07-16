import { RefreshTokenPayload } from '@app/common/interface/refresh-token-payload.interface';
import { AccessTokenPayload } from '@app/common/interface/access-token-payload.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '@app/common/enum/token-type.enum';
import { ResMessage } from '@app/common/enum/res-message.enum';

@Injectable()
export class TokenService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    const accessToken: string = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });

    return accessToken;
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    return refreshToken;
  }

  validateToken(
    token: string,
    type: TokenType,
  ): AccessTokenPayload | RefreshTokenPayload {
    const publicKey =
      type === TokenType.ACCESS_TOKEN
        ? this.config.get('JWT_ACCESS_SECRET')
        : this.config.get('JWT_REFRESH_SECRET');

    try {
      return this.jwtService.verify(token, {
        publicKey,
      });
    } catch (error) {
      const errorMessage: string = error.message;

      if (errorMessage === 'invalid token') {
        throw new HttpException(
          ResMessage.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      } else if (errorMessage === 'jwt expired') {
        throw new HttpException(
          ResMessage.EXPIRED_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else if (errorMessage === 'jwt malformed') {
        throw new HttpException(
          ResMessage.MALFORMED_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(ResMessage.FORBIDDEN, HttpStatus.FORBIDDEN);
      }
    }
  }
}
