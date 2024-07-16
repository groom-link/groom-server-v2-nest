import { Is } from '@app/common/decorator/is.decorator';
import { IsIn } from 'class-validator';

export class GetPostListDto {
  @Is('numberString', false, 'Page Number')
  page: string;

  @Is('numberString', false, 'Limit Number')
  limit: string;

  @Is('string', true, 'simple: Only Title | detail: Include Content')
  @IsIn(['simple', 'detail'], {
    message: 'viewType must be simple or detail',
  })
  viewType: string;

  @Is('string', false, 'Search Keyword')
  keyword?: string | null;
}
