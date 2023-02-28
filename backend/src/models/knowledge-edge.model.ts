import { ApiProperty } from '@nestjs/swagger';

export enum KnowledgeEdgeType {
  HAS_KNOWLEDGE = 'HAS_KNOWLEDGE',
  BEFORE_KNOWLEDGE = 'BEFORE_KNOWLEDGE',
}

export class KnowledgeEdge {
  @ApiProperty({ description: 'The ID of the source node' })
  source: string;

  @ApiProperty({ description: 'The ID of the target node' })
  target: string;

  @ApiProperty({
    enum: ['HAS_KNOWLEDGE', 'BEFORE_KNOWLEDGE'],
    description: 'The type of the relationship',
  })
  type: KnowledgeEdgeType;

  constructor(source: string, target: string, type: KnowledgeEdgeType) {
    this.source = source;
    this.target = target;
    this.type = type;
  }
}
