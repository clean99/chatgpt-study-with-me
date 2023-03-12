import { Module } from '@nestjs/common';
import { KnowledgeNodeController } from './knowledge-node.controller';
import { KnowledgeNodeService } from './knowledge-node.service';
import { neo4jProviderFactory } from '../database/neo4j';

@Module({
  controllers: [KnowledgeNodeController],
  providers: [
    KnowledgeNodeService,
    { provide: 'Driver', useValue: neo4jProviderFactory() },
  ],
  exports: [KnowledgeNodeService],
})
export class KnowledgeNodeModule {}
