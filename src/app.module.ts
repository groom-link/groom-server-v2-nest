import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfig } from './config/env.config';
import { AuthenticationModule } from './module/auth/authentication.module';
import { PostModule } from './module/post/post.module';
import { UserModule } from './module/user/user.module';
import { DataSourceConfig } from './config/data-source.config';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: EnvConfig.nodeFile,
      validationSchema: EnvConfig.validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        DataSourceConfig.getOptions(config),
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => JwtConfig.getOptions(config),
    }),

    // Custom Module
    AuthenticationModule,
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
