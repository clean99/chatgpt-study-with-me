import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class KnowledgeNodeDto {
  @ApiProperty({
    type: String,
    description: 'The title of the knowledge node',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Indicates whether the knowledge node has been completed',
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: 'The ID of the parent knowledge node, if any',
  })
  @IsOptional()
  @IsString()
  parentId?: string | null;
}
