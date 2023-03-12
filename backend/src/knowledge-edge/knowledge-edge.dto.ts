import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { KnowledgeEdgeType } from '../models/knowledge-edge.model';

export class CreateKnowledgeEdgeDto {
  @ApiProperty({
    description: 'The ID of the from node',
    example: 'node1',
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'The ID of the to node',
    example: 'node2',
  })
  @IsString()
  to: string;

  @ApiProperty({
    description: 'The type of the edge',
    example: KnowledgeEdgeType.HAS_KNOWLEDGE,
    required: false,
  })
  @IsOptional()
  type?: KnowledgeEdgeType;
}

export class DeleteKnowledgeEdgeDto {
  @ApiProperty({
    description: 'The ID of the from node',
    example: 'node1',
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'The ID of the to node',
    example: 'node2',
  })
  @IsString()
  to: string;

  @ApiProperty({
    description: 'The type of the edge',
    example: KnowledgeEdgeType.HAS_KNOWLEDGE,
    required: false,
  })
  @IsOptional()
  type?: KnowledgeEdgeType;
}
