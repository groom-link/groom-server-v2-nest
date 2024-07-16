import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/module/user/repository/user.repository';
import { ResMessage } from '@app/common/enum/res-message.enum';
import { User } from '@app/entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    email: string,
    encryptedPassword: string,
    name: string,
    nickname: string,
    tel: string,
    profileUrl?: string,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new HttpException(
        ResMessage.ALREADY_REGISTRATION,
        HttpStatus.CONFLICT,
      );
    }

    await this.userRepository.insert({
      email,
      password: encryptedPassword,
      name,
      nickname,
      tel,
      profileUrl,
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(ResMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
