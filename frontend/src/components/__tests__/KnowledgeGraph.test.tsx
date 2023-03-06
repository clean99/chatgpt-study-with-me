import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditButton from '../KnowledgeGraph/components/EditButton'
import { onSelect, onDoubleClick } from '../KnowledgeGraph/events'
import { Completed, Edge, KnowledgeEdgeType, Node } from '../../types/types'
import { VisNode, VisEdge, VisNodeColor } from '../KnowledgeGraph/type'
import {
  nodeFactory,
  edgeFactory,
  nodeToVisNode,
  edgeToVisEdge,
  eventWrapper,
} from '../KnowledgeGraph/utils'

describe('EditButton', () => {
  it('should render the button', () => {
    render(<EditButton editable={false} setEditable={() => 'set edit'} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should show "Edit" when not editable', () => {
    render(<EditButton editable={false} setEditable={() => 'set edit'} />)
    expect(screen.getByRole('button')).toHaveTextContent('Edit')
  })

  it('should show "Save" when editable', () => {
    render(<EditButton editable={true} setEditable={() => 'set edit'} />)
    expect(screen.getByRole('button')).toHaveTextContent('Save')
  })

  it('should call setEditable when clicked', () => {
    const setEditable = jest.fn()
    render(<EditButton editable={false} setEditable={setEditable} />)
    userEvent.click(screen.getByRole('button'))
    expect(setEditable).toHaveBeenCalledTimes(1)
    expect(setEditable).toHaveBeenCalledWith(true)
  })
})

describe('onSelect', () => {
  it('should call handleClickNode with node and pointer coordinates when nodes exist', () => {
    const handleClickNode = jest.fn()
    const e = {
      nodes: ['1'],
      pointer: {
        DOM: { x: 100, y: 200 },
      },
    }
    onSelect(e, handleClickNode)
    expect(handleClickNode).toHaveBeenCalledWith('1', { x: 100, y: 200 })
  })

  it('should call handleClickNode with null when no nodes exist', () => {
    const handleClickNode = jest.fn()
    const e = {
      nodes: [],
      pointer: {
        DOM: { x: 100, y: 200 },
      },
    }
    onSelect(e, handleClickNode)
    expect(handleClickNode).toHaveBeenCalledWith(null)
  })
})

describe('onDoubleClick', () => {
  it('should call handleAddNode with a new node label when no nodes are selected', () => {
    const handleAddNode = jest.fn()
    const e = { nodes: [] }
    onDoubleClick(e, handleAddNode)
    expect(handleAddNode).toHaveBeenCalledWith('New Node')
  })

  it('should not call handleAddNode when nodes are selected', () => {
    const handleAddNode = jest.fn()
    const e = { nodes: ['1'] }
    onDoubleClick(e, handleAddNode)
    expect(handleAddNode).not.toHaveBeenCalled()
  })
})

describe('eventWrapper', () => {
  test('calls the callback if editable is true', () => {
    const callback = jest.fn()
    const wrapper = eventWrapper(callback, true)
    wrapper('some event')
    expect(callback).toHaveBeenCalledWith('some event')
  })

  test('does not call the callback if editable is false', () => {
    const callback = jest.fn()
    const wrapper = eventWrapper(callback, false)
    wrapper('some event')
    expect(callback).not.toHaveBeenCalled()
  })
})

describe('nodeToVisNode', () => {
  test('converts a node to a VisNode', () => {
    const node: Node = {
      id: '123',
      label: 'Some Label',
      completed: Completed.COMPLETED,
    }
    const expectedVisNode: VisNode = {
      id: '123',
      label: 'Some Label',
      color: VisNodeColor.COMPLETED,
    }
    expect(nodeToVisNode(node)).toEqual(expectedVisNode)
  })
})

describe('edgeToVisEdge', () => {
  test('converts an edge to a VisEdge', () => {
    const edge: Edge = {
      id: '456',
      from: 'node1',
      to: 'node2',
      type: KnowledgeEdgeType.HAS_KNOWLEDGE,
    }
    const expectedVisEdge: VisEdge = {
      from: 'node1',
      to: 'node2',
    }
    expect(edgeToVisEdge(edge)).toEqual(expectedVisEdge)
  })
})

describe('nodeFactory', () => {
  test('creates a node with a generated ID and the given label and completed status', () => {
    const node = nodeFactory('Some Label', Completed.COMPLETED)
    expect(node.id).toBeDefined()
    expect(node.label).toEqual('Some Label')
    expect(node.completed).toEqual(Completed.COMPLETED)
  })

  test('creates a node with a generated ID and the given label and default completed status', () => {
    const node = nodeFactory('Some Label')
    expect(node.id).toBeDefined()
    expect(node.label).toEqual('Some Label')
    expect(node.completed).toEqual(Completed.NOT_COMPLETED)
  })
})

describe('edgeFactory', () => {
  test('creates an edge with a generated ID and the given from and to IDs and type', () => {
    const edge = edgeFactory('node1', 'node2', KnowledgeEdgeType.HAS_KNOWLEDGE)
    expect(edge.id).toBeDefined()
    expect(edge.from).toEqual('node1')
    expect(edge.to).toEqual('node2')
    expect(edge.type).toEqual(KnowledgeEdgeType.HAS_KNOWLEDGE)
  })

  test('creates an edge with a generated ID and the given from and to IDs and default type', () => {
    const edge = edgeFactory('node1', 'node2')
    expect(edge.id).toBeDefined()
    expect(edge.from).toEqual('node1')
    expect(edge.to).toEqual('node2')
    expect(edge.type).toEqual(KnowledgeEdgeType.HAS_KNOWLEDGE)
  })
})
