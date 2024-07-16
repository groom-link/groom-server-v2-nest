import { PostService } from './service/post.service';
import { PostRepository } from './repository/post.repository';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Post } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationModule } from '../auth/authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), JwtModule, AuthenticationModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService, PostRepository],
})
export class PostModule {}
