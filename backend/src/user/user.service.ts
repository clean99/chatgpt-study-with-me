import { Injectable } from '@nestjs/common';
import ThirdPartyPasswordLess from 'supertokens-node/lib/build/recipe/thirdpartypasswordless';
import { User } from 'supertokens-node/recipe/thirdpartypasswordless';

@Injectable()
export class UserService {
  async getUserById(userId: string): Promise<User> {
    const userInfo = await ThirdPartyPasswordLess.getUserById(userId);
    return userInfo;
  }
}
