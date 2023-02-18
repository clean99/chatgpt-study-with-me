import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session.decorator';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartypasswordless';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { User } from 'supertokens-node/recipe/thirdpartypasswordless';

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(new AuthGuard()) // For more information about this guard please read our NestJS guide.
  async getUserInfo(@Session() session: SessionContainer): Promise<User> {
    const userId = session.getUserId();
    // You can learn more about the `User` object over here https://github.com/supertokens/core-driver-interface/wiki
    const userInfo = await ThirdPartyEmailPassword.getUserById(userId);
    //....
    return userInfo;
  }
}
