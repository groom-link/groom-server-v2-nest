import { Is } from '@app/common/decorator/is.decorator';

export class EmailSignUpDto {
  @Is('string', true, 'Email')
  email: string;

  @Is('string', true, 'Password')
  password: string;

  @Is('string', true, 'Confirm Password')
  passwordConfirm: string;

  @Is('string', true, 'Name')
  name: string;

  @Is('string', true, 'Nickname')
  nickname: string;

  @Is('string', true, 'Telephone Number')
  tel: string;

  @Is('string', false, 'Profile Image URL')
  profileUrl?: string | null;
}
