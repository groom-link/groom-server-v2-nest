import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerExceptionDto } from '@app/common/dto/swaggerException.dto';
import { ResEmailSignInDto } from '../controller/dto/res/res-email-sign-in.dto';

export function SignInEmail(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign in with email',
    }),
    ApiOkResponse({
      type: ResEmailSignInDto,
    }),
    ApiBadRequestResponse({ type: SwaggerExceptionDto }),
    ApiUnauthorizedResponse({
      type: SwaggerExceptionDto,
    }),
    ApiInternalServerErrorResponse({ type: SwaggerExceptionDto }),
  );
}
