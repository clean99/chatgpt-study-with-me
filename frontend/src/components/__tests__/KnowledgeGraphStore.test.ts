import { Completed, Edge, KnowledgeEdgeType, Node } from '../../types/types'
import KnowledgeGraphStore from '../KnowledgeGraph/store'

describe('KnowledgeGraphStore', () => {
  const nodes: Node[] = [
    { id: 'node1', label: 'Node 1', completed: Completed.COMPLETED },
    { id: 'node2', label: 'Node 2', completed: Completed.NOT_COMPLETED },
    { id: 'node3', label: 'Node 3', completed: Completed.COMPLETED },
  ]

  const edges: Edge[] = [
    { id: 'edge1', from: 'node1', to: 'node2', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
    { id: 'edge2', from: 'node1', to: 'node3', type: KnowledgeEdgeType.HAS_KNOWLEDGE },
  ]

  let store: KnowledgeGraphStore

  beforeEach(() => {
    store = new KnowledgeGraphStore({ nodes, edges })
  })

  it('should set nodeId', () => {
    store.setNodeId('node1')
    expect(store.nodeId).toBe('node1')
  })

  it('should clear nodeId', () => {
    store.setNodeId('node1')
    store.clearNodeId()
    expect(store.nodeId).toBeNull()
  })

  it('should set edgeId', () => {
    store.setEdgeId('edge1')
    expect(store.edgeId).toBe('edge1')
  })

  it('should clear edgeId', () => {
    store.setEdgeId('edge1')
    store.clearEdgeId()
    expect(store.edgeId).toBeNull()
  })

  it('should set editable', () => {
    store.setEditable(true)
    expect(store.editable).toBe(true)
  })

  it('should add edge', () => {
    const data = { from: 'node1', to: 'node2' }
    store.addEdge(data)
    expect(store.edges.length).toBe(3)
  })

  it('should add node', () => {
    const node = { id: 'node4', label: 'Node 4', completed: Completed.NOT_COMPLETED }
    store.addNode(node)
    expect(store.nodes.length).toBe(4)
    expect(store.nodes).toContainEqual(node)
  })

  it('should delete node', () => {
    store.setNodeId('node1')
    store.deleteNode('node1')
    expect(store.nodeId).toBeNull()
    expect(store.nodes.length).toBe(2)
    expect(store.nodes.find((node) => node.id === 'node1')).toBeUndefined()
    expect(store.edges.length).toBe(0)
  })

  it('should delete edge', () => {
    store.setEdgeId('edge1')
    store.deleteEdge('edge1')
    expect(store.edgeId).toBeNull()
    expect(store.edges.length).toBe(1)
    expect(store.edges.find((edge) => edge.id === 'edge1')).toBeUndefined()
  })

  it('should modify node', () => {
    const node = { id: 'node1', label: 'Modified Node 1', completed: Completed.NOT_COMPLETED }
    store.setNodeId('node1')
    store.modifyNode(node)
    expect(store.nodeId).toBeNull()
    expect(store.nodes.find((node) => node.id === 'node1')).toEqual(node)
  })

  it('should add nodes with parent', () => {
    store.addNodesWithParent('node1', ['Node 4', 'Node 5'])
    expect(store.nodes.length).toBe(5)
    expect(store.edges.length).toBe(4)
    expect(store.nodes.find((node) => node.label === 'Node 4')).toBeDefined()
    expect(store.nodes.find((node) => node.label === 'Node 5')).toBeDefined()
  })
})
