import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditButton from '../KnowledgeGraph/components/EditButton'
import { onDoubleClick } from '../KnowledgeGraph/graphConfig/events'
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

  it('should render correct text', () => {
    const { rerender } = render(
      <EditButton
        editable={true}
        setEditable={() => 'set edit'}
        editableText='cool'
        notEditableText='good'
      />,
    )
    expect(screen.getByRole('button')).toHaveTextContent('cool')
    rerender(
      <EditButton
        editable={false}
        setEditable={() => 'set edit'}
        editableText='cool'
        notEditableText='good'
      />,
    )
    expect(screen.getByRole('button')).toHaveTextContent('good')
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

describe('onDoubleClick', () => {
  const addNode = jest.fn()
  const setNodeId = jest.fn()
  const store = {
    addNode,
    setNodeId,
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call handleAddNode with a new node label when no nodes are selected', () => {
    const e = { nodes: [] }
    onDoubleClick(e, store as any)
    expect(addNode).toHaveBeenCalledWith({completed: 'false', id: expect.any(String), label: 'New Node'})
    expect(setNodeId).not.toBeCalled()
  })

  it('should not call handleAddNode but call handleClickNode with node when nodes are selected', () => {
    const e = { nodes: ['1'] }
    onDoubleClick(e, store as any)
    expect(addNode).not.toHaveBeenCalled()
    expect(setNodeId).toHaveBeenCalledWith('1')
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
      id: '456',
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
