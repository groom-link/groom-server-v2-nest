import { ResCommonDto } from '@app/common/dto/resCommon.dto';
import { GetPostResult } from '@app/module/post/service/dto/get-post-result.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResGetPostDetailDto extends ResCommonDto {
  @ApiProperty({
    required: true,
    description: 'Response Data',
    type: GetPostResult,
  })
  data: GetPostResult;
}
