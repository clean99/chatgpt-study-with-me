import { ApiProperty } from '@nestjs/swagger';

export class KnowledgeNode {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  label: string;
  @ApiProperty({ type: 'boolean' })
  completed: boolean;
  @ApiProperty({ type: 'string' })
  createdAt?: Date;
  @ApiProperty({ type: 'string' })
  updatedAt?: Date;

  constructor(
    id: string,
    label: string,
    completed: boolean,
    parentId: string | null,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.label = label;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
