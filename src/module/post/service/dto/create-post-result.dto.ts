import { Is } from '@app/common/decorator/is.decorator';

export class CreatePostResult {
  @Is('number', true, 'Post ID')
  postId: number;
}
