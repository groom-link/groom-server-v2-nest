import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResGetPostDetailDto } from '../controller/dto/res/res-get-post-detail.dto';

export function GetPost(): MethodDecorator {
  return applyDecorators(
    ApiParam({ name: 'id', description: 'Post ID' }),
    ApiOperation({ summary: 'Get post details API' }),
    ApiOkResponse({ type: ResGetPostDetailDto }),
    ApiBearerAuth('authorization'),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiForbiddenResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
