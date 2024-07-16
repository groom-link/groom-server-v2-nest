import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationController } from '@app/module/auth/controller/authentication.controller';
import { AuthenticationService } from '@app/module/auth/service/authentication.service';
import { TokenService } from '@app/module/auth/service/token.service';
import { UserModule } from '@app/module/user/user.module';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenService, ConfigService],
  exports: [AuthenticationService, TokenService],
})
export class AuthenticationModule {}
