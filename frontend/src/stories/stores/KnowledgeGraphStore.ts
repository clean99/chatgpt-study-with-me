import { observable } from 'mobx';
import { Completed, KnowledgeEdgeType } from '../../types/types';

export class KnowledgeGraphMockStore {
  @observable nodes = [
    { id: 'node1', label: 'Node 1', completed: Completed.COMPLETED },
    { id: 'node2', label: 'Node 2', completed: Completed.NOT_COMPLETED },
    { id: 'node3', label: 'Node 3', completed: Completed.COMPLETED },
  ];

  @observable edges = [
    { id: 'edge1', from: 'node1', to: 'node2', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
    { id: 'edge2', from: 'node1', to: 'node3', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
  ];

  @observable nodeId = null;
  @observable editable = false;
}
