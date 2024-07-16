import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function DeletePost(): MethodDecorator {
  return applyDecorators(
    ApiParam({ name: 'id', description: 'Post ID' }),
    ApiOperation({ summary: 'Delete post API' }),
    ApiOkResponse({ type: SwaggerExceptionDto }),
    ApiBearerAuth('authorization'),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiForbiddenResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
