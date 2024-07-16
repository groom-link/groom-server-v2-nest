import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';
import { ResEmailSignUpDto } from '../controller/dto/res/res-email-sign-up.dto';

export function SignupEmail(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Sign up by email' }),
    ApiCreatedResponse({ type: ResEmailSignUpDto }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiUnauthorizedResponse({ type: SwaggerExceptionDto }),
    ApiConflictResponse({ type: SwaggerExceptionDto }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
