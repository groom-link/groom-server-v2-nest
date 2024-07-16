import { ResCommonDto } from '@app/common/dto/resCommon.dto';
import { ApiProperty } from '@nestjs/swagger';

class ResEmailSignUpData {
  @ApiProperty({ description: 'User Nickname' })
  nickname: string;

  @ApiProperty({ description: 'User Email' })
  email: string;

  @ApiProperty({ description: 'User Profile URL' })
  profileUrl: string;
}

export class ResEmailSignUpDto extends ResCommonDto {
  @ApiProperty({
    required: true,
    description: 'Response Data',
    type: ResEmailSignUpData,
  })
  data: ResEmailSignUpData;
}
