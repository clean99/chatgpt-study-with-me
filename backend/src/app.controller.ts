import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ApiProperty, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './auth/session.decorator';

export class SessionInfoDto {
  @ApiProperty({ description: 'The handle of the session' })
  sessionHandle: string;

  @ApiProperty({ description: 'The user ID associated with the session' })
  userId: string;

  @ApiProperty({
    description: 'The payload of the access token associated with the session',
  })
  accessTokenPayload: object;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a hello message' })
  @ApiResponse({ status: 200, description: 'Returns a hello message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sessioninfo')
  @ApiOperation({ summary: 'Get session information' })
  @ApiResponse({
    status: 200,
    description: 'Returns session information',
    type: SessionInfoDto,
  })
  @UseGuards(new AuthGuard())
  getSessionInformation(@Session() session: SessionContainer): SessionInfoDto {
    return {
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    };
  }
}
