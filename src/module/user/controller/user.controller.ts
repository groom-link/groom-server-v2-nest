import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@app/module/user/service/user.service';

@ApiTags('User API')
@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
