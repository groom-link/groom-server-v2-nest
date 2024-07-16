import { Post } from '@app/entity/post.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findDetail(id: number) {
    return this.dataSource
      .createQueryBuilder(Post, 'post')
      .select([
        'post.id AS id',
        'post.title AS title',
        'post.content AS content',
        'post.created_at AS created_at',
        'post.updated_at AS updatedAt',
        'user.id AS userId',
        'user.nickname AS nickname',
        'user.profile_url AS profileUrl',
      ])
      .where('post.id = :id', { id })
      .leftJoin('post.userId', 'user')
      .getRawOne();
  }

  async findsWithPagination(
    viewType: string,
    page?: number | null,
    limit?: number | null,
    keyword?: string | null,
  ) {
    const selectList = [
      'post.id AS id',
      'post.title AS title',
      'post.created_at AS createdAt',
      'post.updated_at AS updatedAt',
      'user.id AS userId',
      'user.nickname AS nickname',
      'user.profile_url AS profileUrl',
    ];

    if (viewType === 'detail') {
      selectList.push('post.content AS content');
    }

    const query = this.dataSource
      .createQueryBuilder(Post, 'post')
      .select(selectList)
      .leftJoin('post.userId', 'user')
      .groupBy('post.id')
      .orderBy('post.created_at', 'DESC');

    if (page && limit) {
      query.offset((page - 1) * limit).limit(limit);
    }

    if (keyword) {
      // this query not using Indexes, if you need Indexes then % should be at the end of the keyword
      query
        .where('post.title LIKE :keyword', { keyword: `%${keyword}%` })
        .orWhere('user.nickname LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const [posts, totalCount] = await Promise.all([
      query.getRawMany(),
      query.getCount(),
    ]);

    const hasNext = page * limit < totalCount;

    return { posts, totalCount, hasNext };
  }
}
