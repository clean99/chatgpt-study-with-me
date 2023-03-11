import { makeAutoObservable } from 'mobx'
import { Edge, EdgeFromTo, KnowledgeEdgeType, Node } from '../../types/types'
import { edgeFactory, nodeFactory } from './utils'
import { v4 as uuidv4 } from 'uuid'

class KnowledgeGraphStore {
  nodes: Node[] = []
  edges: Edge[] = []

  nodeId: string | null = null
  edgeId: string | null = null
  editable = false

  constructor(data: { nodes: Node[]; edges: Edge[] }) {
    this.nodes = data.nodes
    this.edges = data.edges

    makeAutoObservable(this, {}, { autoBind: true })
  }

  setNodeId(nodeId: string | null) {
    this.nodeId = nodeId
  }

  clearNodeId() {
    this.setNodeId(null)
  }

  setEdgeId(edgeId: string | null) {
    this.edgeId = edgeId
  }

  clearEdgeId() {
    this.setEdgeId(null)
  }

  setEditable(editable: boolean) {
    this.editable = editable
  }

  addEdge(data: EdgeFromTo) {
    const edge = { ...data, id: uuidv4(), type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    this.edges = [...this.edges, edge]
  }

  addNode(node: Node) {
    this.nodes = [...this.nodes, node]
  }

  deleteNode(nodeId: string) {
    this.nodes = this.nodes.filter((node) => node.id !== nodeId)
    this.edges = this.edges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId)
    this.clearNodeId()
  }

  deleteEdge(edgeId: string) {
    this.edges = this.edges.filter((edge) => edge.id !== edgeId)
    this.clearEdgeId()
  }

  modifyNode({ label, completed }: Pick<Node, 'label' | 'completed'>) {
    this.nodes = this.nodes.map((node) => {
      if (node.id === this.nodeId) {
        return {
          ...node,
          label,
          completed,
        }
      }
      return node
    })
    this.clearNodeId()
  }

  addNodesWithParent(nodeId: string, titles: string[]) {
    const newNodes = titles.map((title) => nodeFactory(title))
    const newEdges = newNodes.map((node) => edgeFactory(nodeId, node.id))
    this.nodes = [...this.nodes, ...newNodes]
    this.edges = [...this.edges, ...newEdges]
    this.clearNodeId()
  }
}

export default KnowledgeGraphStore
