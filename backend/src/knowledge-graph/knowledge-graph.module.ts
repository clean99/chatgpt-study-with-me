import { Module } from '@nestjs/common';
import { KnowledgeNodeModule } from '../knowledge-node/knowledge-node.module';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { KnowledgeGraphController } from './knowledge-graph.controller';
import { neo4jProviderFactory } from '../database/neo4j';
import { KnowledgeEdgeModule } from '../knowledge-edge/knowledge-edge.module';

@Module({
  imports: [KnowledgeNodeModule, KnowledgeEdgeModule],
  providers: [
    KnowledgeGraphService,
    { provide: 'Driver', useValue: neo4jProviderFactory() },
  ],
  controllers: [KnowledgeGraphController],
})
export class KnowledgeGraphModule {}
