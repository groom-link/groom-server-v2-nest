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

export function UpdatePost(): MethodDecorator {
  return applyDecorators(
    ApiParam({ name: 'id', description: 'Post ID' }),
    ApiOperation({ summary: 'Update post API' }),
    ApiOkResponse({ type: SwaggerExceptionDto }),
    ApiBearerAuth('authorization'),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiForbiddenResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
