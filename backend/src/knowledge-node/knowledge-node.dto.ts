import { ApiProperty } from '@nestjs/swagger';

export class KnowledgeNodeDto {
  @ApiProperty({
    type: String,
    description: 'The title of the knowledge node',
  })
  title: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Indicates whether the knowledge node has been completed',
  })
  completed?: boolean;

  @ApiProperty({
    type: String,
    required: false,
    nullable: true,
    description: 'The ID of the parent knowledge node, if any',
  })
  parentId?: string | null;
}
