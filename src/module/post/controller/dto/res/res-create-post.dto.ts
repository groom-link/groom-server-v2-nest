import { ResCommonDto } from '@app/common/dto/resCommon.dto';
import { CreatePostResult } from '@app/module/post/service/dto/create-post-result.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResCreatePostDto extends ResCommonDto {
  @ApiProperty({
    required: true,
    description: 'Response Data',
    type: CreatePostResult,
  })
  data: CreatePostResult;
}
