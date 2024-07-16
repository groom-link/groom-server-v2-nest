import { Is } from '@app/common/decorator/is.decorator';
import { ApiProperty } from '@nestjs/swagger';

class GetPostListData {
  @Is('number', true, 'Post ID')
  id: number;

  @Is('string', true, 'Post Title')
  title: string;

  @Is('string', false, 'Post Content')
  content?: string;

  @Is('string', true, 'Post Write Date')
  createdTime: Date;

  @Is('string', true, 'Post Updated Date')
  updatedTime: Date;

  @Is('number', true, 'Post Writing User ID')
  userId: number;

  @Is('string', true, 'Post Writer Nickname')
  nickname: string;

  @Is('string', true, 'Post Writer Profile URL')
  profileUrl: string;
}

export class GetPostsResult {
  @ApiProperty({
    required: true,
    description: 'Post List',
    type: [GetPostListData],
  })
  posts: GetPostListData[];

  @Is('number', true, 'all posts count')
  totalCount: number;

  @Is('number', true, 'has next page')
  hasNext: boolean;
}
