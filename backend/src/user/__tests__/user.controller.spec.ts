import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../auth/auth.guard';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { expectedUserInfo, userId } from '../__stubs__/stubs';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUserInfo', () => {
    it('should return user info for a valid session', async () => {
      const session = {
        getUserId: jest.fn(() => userId),
      } as any;

      jest
        .spyOn(userService, 'getUserById')
        .mockResolvedValueOnce(expectedUserInfo);

      const result = await controller.getUserInfo(session);

      expect(session.getUserId).toHaveBeenCalled();
      expect(userService.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUserInfo);
    });

    it('should throw an error for an invalid session', async () => {
      const session = {
        getUserId: jest.fn(() => null),
      } as any;

      await expect(controller.getUserInfo(session)).rejects.toThrowError(
        'Invalid session',
      );
    });
  });
});
