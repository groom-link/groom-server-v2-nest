import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResMessage } from '@app/common/enum/res-message.enum';
import { UserRepository } from '@app/module/user/repository/user.repository';
import { User } from '@app/entity/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {}
  getEncryptedPassword(
    password: string,
    passwordConfirm: string,
  ): Promise<string> {
    if (password !== passwordConfirm) {
      throw new HttpException(
        ResMessage.PASSWORD_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    return bcrypt.hash(password, 10);
  }

  async signInEmail(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException(ResMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException(ResMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
