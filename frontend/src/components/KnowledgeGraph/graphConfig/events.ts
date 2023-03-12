import KnowledgeGraphStore from '../store'
import { nodeFactory } from '../utils'

export function onDoubleClick(e: any, store: KnowledgeGraphStore) {
  if (!store.editable) return
  if (e?.nodes?.[0]) {
    store.setNodeId(e.nodes[0])
  } else {
    store.addNode(nodeFactory('New Node'))
  }
}

export function onSelect(event: any, store: KnowledgeGraphStore) {
  if (event.edges.length > 0 && event.nodes.length === 0) {
    return store.setEdgeId(event.edges[0])
  }
  store.clearEdgeId()
}
