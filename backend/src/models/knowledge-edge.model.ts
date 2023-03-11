import { ApiProperty } from '@nestjs/swagger';

export enum KnowledgeEdgeType {
  HAS_KNOWLEDGE = 'HAS_KNOWLEDGE',
  BEFORE_KNOWLEDGE = 'BEFORE_KNOWLEDGE',
}

export class KnowledgeEdge {
  @ApiProperty({ description: 'The ID of the edge' })
  id: string;

  @ApiProperty({ description: 'The ID of the from node' })
  from: string;

  @ApiProperty({ description: 'The ID of the to node' })
  to: string;

  @ApiProperty({
    enum: ['HAS_KNOWLEDGE', 'BEFORE_KNOWLEDGE'],
    description: 'The type of the relationship',
  })
  type: KnowledgeEdgeType;

  constructor(from: string, to: string, type: KnowledgeEdgeType) {
    this.from = from;
    this.to = to;
    this.type = type;
  }
}
