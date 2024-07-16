import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { ResMessage } from '@app/common/enum/res-message.enum';
import { CreatePostResult } from './dto/create-post-result.dto';
import { GetPostsResult } from './dto/get-posts-result.dto';
import { GetPostResult } from './dto/get-post-result.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(
    title: string,
    content: string,
    userId: number,
  ): Promise<CreatePostResult> {
    const insertResult = await this.postRepository.insert({
      title,
      content,
      userId,
    });

    return { postId: insertResult?.identifiers[0]?.id };
  }

  async getList(
    viewType: string,
    page?: number | null,
    limit?: number | null,
    keyword?: string | null,
  ): Promise<GetPostsResult> {
    const posts = await this.postRepository.findsWithPagination(
      viewType,
      page,
      limit,
      keyword,
    );

    return posts;
  }

  async getDetail(id: number): Promise<GetPostResult> {
    const post = await this.postRepository.findDetail(id);

    if (!post) {
      throw new HttpException(ResMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async update(
    id: number,
    title: string,
    content: string,
    userId: number,
  ): Promise<void> {
    const post = await this.postRepository.findOneBy({ id, userId });

    if (!post) {
      throw new HttpException(ResMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.postRepository.update(id, { title, content });
  }

  async delete(id: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ id, userId });

    if (!post) {
      throw new HttpException(ResMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.postRepository.softDelete(id);
  }
}
