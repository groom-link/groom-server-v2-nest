import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/module/user/repository/user.repository';
import { ConfigService } from '@nestjs/config';
import { UserController } from '@app/module/user/controller/user.controller';
import { User } from '@app/entity/user.entity';
import { UserService } from '@app/module/user/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, ConfigService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
