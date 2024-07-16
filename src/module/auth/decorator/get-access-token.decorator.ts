import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';

export function RefreshAccessToken(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Generate new access token by refresh token' }),
    ApiOkResponse({
      type: SwaggerExceptionDto,
    }),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiForbiddenResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
