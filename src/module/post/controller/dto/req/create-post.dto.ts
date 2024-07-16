import { Is } from '@app/common/decorator/is.decorator';
import { MaxLength } from 'class-validator';

export class CreatePostDto {
  @Is('string', true, '게시글 제목')
  @MaxLength(128)
  title: string;

  @Is('string', true, '게시글 내용')
  @MaxLength(1024)
  content: string;
}
