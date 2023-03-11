import { Completed, Edge, KnowledgeEdgeType, Node } from '../../types/types'
import {
  deletedLog,
  addedLog,
  updatedLog,
  Identifiable,
  DiffResult,
  nodeCompare,
  IDCompare,
  edgeCompare,
  sorter,
  diff,
} from '../diff'

describe('deletedLog', () => {
  it('should add the ID of the deleted item to the deleted array in the diff result', () => {
    const item: Identifiable = { id: '1' }
    const resLog: DiffResult<Identifiable> = { added: [], deleted: [], updated: [] }
    deletedLog(item, resLog)
    expect(resLog.deleted).toEqual(['1'])
  })
})

describe('addedLog', () => {
  it('should add the added item to the added array in the diff result', () => {
    const item: Identifiable = { id: '1' }
    const resLog: DiffResult<Identifiable> = { added: [], deleted: [], updated: [] }
    addedLog(item, resLog)
    expect(resLog.added).toEqual([item])
  })
})

describe('updatedLog', () => {
  it('should add the updated item to the updated array in the diff result', () => {
    const item: Identifiable = { id: '1' }
    const resLog: DiffResult<Identifiable> = { added: [], deleted: [], updated: [] }
    updatedLog(item, resLog)
    expect(resLog.updated).toEqual([item])
  })
})

describe('sorter', () => {
  it('should sort the array of identifiable objects based on their ID property', () => {
    const arr: Identifiable[] = [{ id: '3' }, { id: '2' }, { id: '1' }]
    const sortedArr = arr.sort(sorter)
    expect(sortedArr).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }])
  })
})

describe('nodeCompare', () => {
  it('should return an equal CompareResult if the IDs of the nodes are equal and the other properties are equal', () => {
    const a: Node = { id: '1', label: 'A', completed: Completed.COMPLETED }
    const b: Node = { id: '1', label: 'A', completed: Completed.COMPLETED }
    const result = nodeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.EQUAL, isUpdated: false })
  })

  it('should return a small CompareResult if the ID of node A is smaller than the ID of node B', () => {
    const a: Node = { id: '1', label: 'A', completed: Completed.COMPLETED }
    const b: Node = { id: '2', label: 'B', completed: Completed.NOT_COMPLETED }
    const result = nodeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.SMALL, isUpdated: false })
  })

  it('should return a big CompareResult if the ID of node A is larger than the ID of node B', () => {
    const a: Node = { id: '3', label: 'A', completed: Completed.COMPLETED }
    const b: Node = { id: '2', label: 'B', completed: Completed.NOT_COMPLETED }
    const result = nodeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.BIG, isUpdated: false })
  })

  it('should return isUpdated as true if the properties of node A and node B are different', () => {
    const a: Node = { id: '1', label: 'A', completed: Completed.COMPLETED }
    const b: Node = { id: '1', label: 'B', completed: Completed.NOT_COMPLETED }
    const result = nodeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.EQUAL, isUpdated: true })
  })
})

describe('edgeCompare', () => {
  it('should return an equal CompareResult if the IDs of the edges are equal and the other properties are equal', () => {
    const a: Edge = { id: '1', from: 'A', to: 'B', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const b: Edge = { id: '1', from: 'A', to: 'B', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const result = edgeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.EQUAL, isUpdated: false })
  })

  it('should return a small CompareResult if the ID of edge A is smaller than the ID of edge B', () => {
    const a: Edge = { id: '1', from: 'A', to: 'B', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const b: Edge = { id: '2', from: 'B', to: 'C', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const result = edgeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.SMALL, isUpdated: false })
  })

  it('should return a big CompareResult if the ID of edge A is larger than the ID of edge B', () => {
    const a: Edge = { id: '3', from: 'A', to: 'B', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const b: Edge = { id: '2', from: 'B', to: 'C', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const result = edgeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.BIG, isUpdated: false })
  })

  it('should return isUpdated as true if the properties of edge A and edge B are different', () => {
    const a: Edge = { id: '1', from: 'A', to: 'B', type: KnowledgeEdgeType.HAS_KNOWLEDGE }
    const b: Edge = { id: '1', from: 'B', to: 'A', type: KnowledgeEdgeType.BEFORE_KNOWLEDGE }
    const result = edgeCompare(a, b)
    expect(result).toEqual({ idCompare: IDCompare.EQUAL, isUpdated: true })
  })
})

describe('diff', () => {
  it('should return an empty result when oldNode and newNode are both empty arrays', () => {
    const oldNode: Node[] = []
    const newNode: Node[] = []
    const result = diff(oldNode, newNode, nodeCompare, sorter)
    expect(result).toEqual({ added: [], deleted: [], updated: [] })
  })

  it('should add all newNode to added list when oldNode is empty', () => {
    const oldNode: Node[] = []
    const newNode: Node[] = [
      { id: '1', label: 'Node 1', completed: Completed.COMPLETED },
      { id: '2', label: 'Node 2', completed: Completed.COMPLETED },
    ]
    const result = diff(oldNode, newNode, nodeCompare, sorter)
    expect(result).toEqual({ added: newNode, deleted: [], updated: [] })
  })

  it('should add all oldNode to deleted list when newNode is empty', () => {
    const oldNode: Node[] = [
      { id: '1', label: 'Node 1', completed: Completed.NOT_COMPLETED },
      { id: '2', label: 'Node 2', completed: Completed.COMPLETED },
    ]
    const newNode: Node[] = []
    const result = diff(oldNode, newNode, nodeCompare, sorter)
    expect(result).toEqual({ added: [], deleted: ['1', '2'], updated: [] })
  })

  it('should add updated node to updated list when their properties are different', () => {
    const oldNode: Node[] = [
      { id: '1', label: 'Node 1', completed: Completed.NOT_COMPLETED },
      { id: '2', label: 'Node 2', completed: Completed.COMPLETED },
    ]
    const newNode: Node[] = [
      { id: '1', label: 'Node 1', completed: Completed.COMPLETED },
      { id: '2', label: 'Node 2', completed: Completed.COMPLETED },
    ]
    const result = diff(oldNode, newNode, nodeCompare, sorter)
    expect(result).toEqual({ added: [], deleted: [], updated: [newNode[0]] })
  })

  it('should add all added nodes and deleted nodes to their corresponding list', () => {
    const oldNode: Node[] = [
      { id: '1', label: 'Node 1', completed: Completed.NOT_COMPLETED },
      { id: '2', label: 'Node 2', completed: Completed.COMPLETED },
      { id: '3', label: 'Node 3', completed: Completed.NOT_COMPLETED },
    ]
    const newNode: Node[] = [
      { id: '2', label: 'Node 2', completed: Completed.COMPLETED },
      { id: '4', label: 'Node 4', completed: Completed.NOT_COMPLETED },
      { id: '5', label: 'Node 5', completed: Completed.NOT_COMPLETED },
    ]
    const result = diff(oldNode, newNode, nodeCompare, sorter)
    expect(result).toEqual({ added: [newNode[1], newNode[2]], deleted: ['1', '3'], updated: [] })
  })
})
