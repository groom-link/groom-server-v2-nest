import { ResCommonDto } from '@app/common/dto/resCommon.dto';
import { GetPostsResult } from '@app/module/post/service/dto/get-posts-result.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResGetPostListDto extends ResCommonDto {
  @ApiProperty({
    required: true,
    description: 'Response Data',
    type: GetPostsResult,
  })
  data: GetPostsResult;
}
