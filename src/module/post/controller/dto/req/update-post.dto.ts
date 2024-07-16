import { Is } from '@app/common/decorator/is.decorator';
import { MaxLength } from 'class-validator';

export class UpdatePostDto {
  @Is('string', false, '수정할 게시글 제목')
  @MaxLength(128)
  title: string;

  @Is('string', false, '수정할 게시글 내용')
  @MaxLength(1024)
  content: string;
}
