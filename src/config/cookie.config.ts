import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

export class CookieConfig {
  static getOptions(config: ConfigService): CookieOptions {
    return {
      domain:
        config.get('NODE_ENV') === 'dev' ? '.localhost' : '.your-domain.com',
      path: '/',
      secure: config.get('NODE_ENV') !== 'dev',
      httpOnly: false,
      sameSite: config.get('NODE_ENV') === 'dev' ? 'lax' : 'none',
    } as CookieOptions;
  }

  static parseCookies(cookieString: string): object {
    const cookies = {};

    if (cookieString) {
      cookieString.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    }

    return cookies;
  }
}
