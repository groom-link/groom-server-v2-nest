import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  static getOptions(config: ConfigService): JwtModuleOptions {
    return {
      global: true,
      secret: config.get('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    } as JwtModuleOptions;
  }
}
