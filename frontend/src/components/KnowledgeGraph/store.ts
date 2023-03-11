import { makeAutoObservable } from 'mobx'
import { Edge, EdgeFromTo, KnowledgeEdgeType, Node } from '../../types/types'
import { edgeFactory, nodeFactory } from './utils'
import { v4 as uuidv4 } from 'uuid'
import { getGraph, GetGraphResponse, postDiff } from '../../services/graph'
import { diff, edgeCompare, nodeCompare, sorter } from '../../utils/diff'
import { message } from 'antd'

class KnowledgeGraphStore {
  nodes: Node[] = []
  edges: Edge[] = []
  defaultNodes: Node[] = []
  defaultEdges: Edge[] = []

  nodeId: string | null = null
  edgeId: string | null = null
  editable = false

  constructor() {
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

  setNodesAndEdges(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes
    this.edges = edges
    this.defaultNodes = nodes
    this.defaultEdges = edges
  }

  async initGraph() {
    try {
      const response: GetGraphResponse = await getGraph()
      const { nodes, edges } = response.data
      this.setNodesAndEdges(nodes, edges)

    } catch (error) {
      message.error('Error getting graph.')
    }
  }

  async sendDiff() {
    try {
      const nodeDiff = diff<Node>(this.defaultNodes, this.nodes, nodeCompare, sorter)
      const edgeDiff = diff<Edge>(this.defaultEdges, this.edges, edgeCompare, sorter)
      const response = await postDiff(nodeDiff, edgeDiff)
      const { nodes, edges } = response.data
      this.setNodesAndEdges(nodes, edges)
    } catch (error) {
      message.error('Error posting diff.')
    }
  }
}

export default KnowledgeGraphStore
