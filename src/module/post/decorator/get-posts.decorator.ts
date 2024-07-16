import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResGetPostListDto } from '../controller/dto/res/res-get-post-list.dto';

export function GetPosts(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get post list API' }),
    ApiBearerAuth('authorization'),
    ApiOkResponse({ type: ResGetPostListDto }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
