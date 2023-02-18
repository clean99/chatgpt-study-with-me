import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { User } from 'supertokens-node/recipe/thirdpartypasswordless';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserDto } from './user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(new AuthGuard()) // For more information about this guard please read our NestJS guide.
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({
    status: 200,
    description: 'Returns user information',
    type: UserDto,
  })
  @ApiResponse({ status: 500, description: 'Invalid session' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserInfo(@Session() session: SessionContainer): Promise<User> {
    const userId = session.getUserId();
    if (!userId) {
      throw new Error('Invalid session');
    }
    return await this.userService.getUserById(userId);
  }
}
