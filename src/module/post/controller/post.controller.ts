import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAccessToken } from '@app/common/decorator/get-access-token.decorator';
import { AccessTokenPayload } from '@app/common/interface/access-token-payload.interface';
import { PostService } from '@app/module/post/service/post.service';
import { JwtAuthGuard } from '@app/common/guard/jwt-auth.guard';
import { CreatePostDto } from '@app/module/post/controller/dto/req/create-post.dto';
import { GetPost } from '@app/module/post/decorator/get-board.decorator';
import { GetPostListDto } from '@app/module/post/controller/dto/req/get-post-list.dto';
import { UpdatePostDto } from '@app/module/post/controller/dto/req/update-post.dto';
import { UpdatePost } from '@app/module/post/decorator/update-board.dto';
import { CreatePost } from '@app/module/post/decorator/create-post.decorator';
import { GetPosts } from '@app/module/post/decorator/get-posts.decorator';
import { DeletePost } from '@app/module/post/decorator/delete-post.decorator';

@ApiTags('Post API')
@Controller('/api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @CreatePost()
  @Post()
  create(
    @Body() dto: CreatePostDto,
    @GetAccessToken() token: AccessTokenPayload,
  ) {
    const { title, content } = dto;
    const { id: userId } = token;

    return this.postService.create(title, content, userId);
  }

  @GetPosts()
  @Get()
  getList(@Query() dto: GetPostListDto) {
    const { page = null, limit = null, viewType, keyword = null } = dto;

    return this.postService.getList(viewType, +page, +limit, keyword);
  }

  @GetPost()
  @Get('/:id')
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @UpdatePost()
  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @GetAccessToken() token: AccessTokenPayload,
  ) {
    const { title = null, content = null } = dto;
    const { id: userId } = token;

    return this.postService.update(id, title, content, userId);
  }

  @UseGuards(JwtAuthGuard)
  @DeletePost()
  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetAccessToken() token: AccessTokenPayload,
  ) {
    const { id: userId } = token;

    return this.postService.delete(id, userId);
  }
}
