import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { User } from 'supertokens-node/recipe/thirdpartypasswordless';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(new AuthGuard()) // For more information about this guard please read our NestJS guide.
  async getUserInfo(@Session() session: SessionContainer): Promise<User> {
    const userId = session.getUserId();
    if (!userId) {
      throw new Error('Invalid session');
    }
    return await this.userService.getUserById(userId);
  }
}
