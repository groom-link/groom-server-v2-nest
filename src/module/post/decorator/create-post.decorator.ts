import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResCreatePostDto } from '../controller/dto/res/res-create-post.dto';

export function CreatePost(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create post API' }),
    ApiCreatedResponse({ type: ResCreatePostDto }),
    ApiBearerAuth('authorization'),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiForbiddenResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
