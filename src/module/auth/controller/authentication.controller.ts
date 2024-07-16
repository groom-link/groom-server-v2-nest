import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request as NestRequest,
  Response as NestResponse,
  Get,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationService } from '@app/module/auth/service/authentication.service';
import { SignInEmail } from '@app/module/auth/decorator/sign-in-email.decorator';
import { EmailSignInDto } from '@app/module/auth/controller/dto/req/email-sign-in.dto';
import { SignupEmail } from '@app/module/auth/decorator/sign-up-email.decorator';
import { EmailSignUpDto } from '@app/module/auth/controller/dto/req/email-sign-up.dto';
import { UserService } from '@app/module/user/service/user.service';
import { CookieConfig } from '@app/config/cookie.config';
import { TokenService } from '@app/module/auth/service/token.service';
import { User } from '@app/entity/user.entity';
import { AccessTokenPayload } from '@app/common/interface/access-token-payload.interface';
import { RefreshTokenPayload } from '@app/common/interface/refresh-token-payload.interface';
import { TokenType } from '@app/common/enum/token-type.enum';
import { RefreshAccessToken } from '@app/module/auth/decorator/get-access-token.decorator';

@ApiTags('Authentication API')
@Controller('/api/v1/auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {}

  @SignupEmail()
  @Post('/sign-up/email')
  async signUpEmail(@Body() dto: EmailSignUpDto) {
    const {
      email,
      password,
      passwordConfirm,
      name,
      nickname,
      tel,
      profileUrl = null,
    } = dto;

    const encryptedPassword =
      await this.authenticationService.getEncryptedPassword(
        password,
        passwordConfirm,
      );

    await this.userService.createUser(
      email,
      encryptedPassword,
      name,
      nickname,
      tel,
      profileUrl,
    );
  }

  @HttpCode(200)
  @SignInEmail()
  @Post('/sign-in/email')
  async signInEmail(
    @Body() dto: EmailSignInDto,
    @NestResponse() res: Response,
  ) {
    const { email, password } = dto;

    const user: User = await this.authenticationService.signInEmail(
      email,
      password,
    );

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      id: user.id,
    };

    const accessToken: string =
      this.tokenService.generateAccessToken(accessTokenPayload);

    const refreshToken: string =
      this.tokenService.generateRefreshToken(refreshTokenPayload);

    res.cookie(
      'accessToken',
      `Bearer ${accessToken}`,
      CookieConfig.getOptions(this.config),
    );

    res.cookie('refreshToken', refreshToken, {
      ...CookieConfig.getOptions(this.config),
      httpOnly: true,
    });

    res.send({
      success: true,
      data: {
        email: user.email,
        nickname: user.nickname,
        profileUrl: user.profileUrl,
      },
    });
  }

  @RefreshAccessToken()
  @Get('access-token')
  async refreshAccessToken(@NestRequest() req, @NestResponse() res) {
    const cookiesHeader: string = req.headers['cookie'];

    const refreshToken: string =
      CookieConfig.parseCookies(cookiesHeader)['refreshToken'];

    const refreshTokenPayload: RefreshTokenPayload =
      this.tokenService.validateToken(refreshToken, TokenType.REFRESH_TOKEN);

    const user: User = await this.userService.getUser(refreshTokenPayload.id);

    const accessTokenPayload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
    };

    const newAccessToken: string =
      this.tokenService.generateAccessToken(accessTokenPayload);

    res.cookie(
      'accessToken',
      `Bearer ${newAccessToken}`,
      CookieConfig.getOptions(this.config),
    );

    return res.status(200).send({
      success: true,
    });
  }
}
