import { v4 as uuidv4 } from 'uuid'
import { Completed, Edge, KnowledgeEdgeType, Node } from '../../types/types'
import { VisNode, VisEdge, VisNodeColor } from './type'

export function eventWrapper(callback: (e: any) => void, editable: boolean) {
  return (e: any) => {
    if (editable) {
      callback(e)
    }
  }
}

export function nodeToVisNode(node: Node): VisNode {
  return {
    id: node.id,
    label: node.label,
    color:
      node.completed === Completed.COMPLETED ? VisNodeColor.COMPLETED : VisNodeColor.NOT_COMPLETED,
  }
}

export function edgeToVisEdge(edge: Edge): VisEdge {
  return {
    from: edge.from,
    to: edge.to,
  }
}

export function nodeFactory(label: string, completed: Completed = Completed.NOT_COMPLETED): Node {
  return {
    id: uuidv4(),
    label,
    completed,
  }
}

export function edgeFactory(
  from: string,
  to: string,
  type: KnowledgeEdgeType = KnowledgeEdgeType.HAS_KNOWLEDGE,
): Edge {
  return {
    id: uuidv4(),
    from,
    to,
    type,
  }
}
