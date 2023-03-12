import { KnowledgeEdge } from 'src/models/knowledge-edge.model';
import { KnowledgeNode } from 'src/models/knowledge-node.model';

export interface Identifiable {
  id: string;
}

export interface DiffResult<T extends Identifiable> {
  added: T[];
  deleted: string[];
  updated: T[];
}

export type NodeDiff = DiffResult<KnowledgeNode>;
export type EdgeDiff = DiffResult<KnowledgeEdge>;

export interface NodesAndEdgesDiff {
  nodes: NodeDiff;
  edges: EdgeDiff;
}
