import { ApiProperty } from '@nestjs/swagger';

export class KnowledgeNode {
  @ApiProperty({ type: 'string' })
  id: string;
  @ApiProperty({ type: 'string' })
  title: string;
  @ApiProperty({ type: 'boolean' })
  completed: boolean;
  @ApiProperty({ type: 'string' })
  createdAt: Date;
  @ApiProperty({ type: 'string' })
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    completed: boolean,
    parentId: string | null,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
