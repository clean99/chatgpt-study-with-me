import { Inject, Injectable } from '@nestjs/common';
import { KnowledgeNodeService } from '../knowledge-node/knowledge-node.service';
import { KnowledgeEdgeService } from '../knowledge-edge/knowledge-edge.service';
import { KnowledgeGraph } from 'src/models/knowledge-graph.model';

@Injectable()
export class KnowledgeGraphService {
  constructor(
    @Inject(KnowledgeNodeService)
    private readonly nodeService: KnowledgeNodeService,
    @Inject(KnowledgeEdgeService)
    private readonly edgeService: KnowledgeEdgeService,
  ) {}

  async getAllNodesAndEdges(userId: string): Promise<KnowledgeGraph> {
    const nodes = await this.nodeService.getNodes(userId);
    const nodeIds = nodes.map((node) => node.id);
    const edges = await this.edgeService.getEdges(nodeIds);

    return { nodes, edges };
  }
}
