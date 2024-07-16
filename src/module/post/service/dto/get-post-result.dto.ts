import { Is } from '@app/common/decorator/is.decorator';

export class GetPostResult {
  @Is('number', true, 'Post ID')
  id: number;

  @Is('string', true, 'Post Title')
  title: string;

  @Is('string', true, 'Post Content')
  content: string;

  @Is('string', true, 'Post Writed Date')
  createdTime: Date;

  @Is('string', true, 'Post Updated Date')
  updatedTime: Date;

  @Is('string', true, 'Post Writer')
  nickname: string;

  @Is('string', false, 'Post Writer Profile URL')
  profileUrl?: string | null;

  @Is('number', true, 'Post Writer ID')
  userId: number;
}
