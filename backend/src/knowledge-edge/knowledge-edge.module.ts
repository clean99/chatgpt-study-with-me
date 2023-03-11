import { Module } from '@nestjs/common';
import { KnowledgeEdgeController } from './knowledge-edge.controller';
import { KnowledgeEdgeService } from './knowledge-edge.service';
import { neo4jProviderFactory } from '../database/neo4j';

@Module({
  controllers: [KnowledgeEdgeController],
  providers: [
    KnowledgeEdgeService,
    { provide: 'Driver', useValue: neo4jProviderFactory() },
  ],
  exports: [KnowledgeEdgeService],
})
export class KnowledgeEdgeModule {}
