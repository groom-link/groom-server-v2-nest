import { Is } from '@app/common/decorator/is.decorator';

export class EmailSignInDto {
  @Is('string', true, 'Email')
  email: string;

  @Is('string', true, 'Password')
  password: string;
}
