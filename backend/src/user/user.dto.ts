import { ApiProperty } from '@nestjs/swagger';

export class ThirdPartyDto {
  @ApiProperty({
    description: 'The ID of the third-party authentication provider',
  })
  id: string;

  @ApiProperty({
    description:
      'The user ID associated with the third-party authentication provider',
  })
  userId: string;
}

export class UserDto {
  @ApiProperty({ description: 'The ID of the user' })
  id: string;

  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'The time the user joined' })
  timeJoined: number;

  @ApiProperty({
    description:
      'The ID and user ID of the third-party authentication provider',
    type: () => ThirdPartyDto,
  })
  thirdParty: ThirdPartyDto;
}
