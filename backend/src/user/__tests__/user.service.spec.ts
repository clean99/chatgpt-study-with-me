import { Test, TestingModule } from '@nestjs/testing';
import ThirdPartyPasswordLess from 'supertokens-node/lib/build/recipe/thirdpartypasswordless';
import { UserService } from '../user.service';
import { expectedUserInfo, userId } from '../__stubs__/stubs';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUserById', () => {
    it('should call getUserById with the correct user ID', async () => {
      jest
        .spyOn(ThirdPartyPasswordLess, 'getUserById')
        .mockResolvedValueOnce(expectedUserInfo);

      const result = await userService.getUserById(userId);

      expect(ThirdPartyPasswordLess.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUserInfo);
    });

    it('should throw an error if getUserById returns an error', async () => {
      const userId = '123';

      jest
        .spyOn(ThirdPartyPasswordLess, 'getUserById')
        .mockRejectedValueOnce(new Error('Unable to get user information'));

      await expect(userService.getUserById(userId)).rejects.toThrowError(
        'Unable to get user information',
      );
    });
  });
});
