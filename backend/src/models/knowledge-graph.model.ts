import { KnowledgeNode } from './knowledge-node.model';
import { KnowledgeEdge } from './knowledge-edge.model';

export class KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];

  constructor(nodes: KnowledgeNode[], edges: KnowledgeEdge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }
}
