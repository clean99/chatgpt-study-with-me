import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NodePanel from '../NodePanel'

const nodeData = {
  id: '1',
  label: 'Node 1',
  completed: true,
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => 'error')
  jest.spyOn(console, 'warn').mockImplementation(() => 'warn')
})

afterAll(() => {
  jest.spyOn(console, 'error').mockRestore()
  jest.spyOn(console, 'warn').mockRestore()
  jest.clearAllMocks()
})

function install() {
  const onModifySubmit = jest.fn()
  const onClose = jest.fn()
  const onDelete = jest.fn()
  const onAdd = jest.fn()
  render(
    <NodePanel
      x={0}
      y={0}
      nodeData={nodeData}
      isVisible={true}
      onClose={onClose}
      onModifySubmit={onModifySubmit}
      onDelete={onDelete}
      onAdd={onAdd}
    />,
  )
  return {
    onModifySubmit,
    onClose,
    onDelete,
    onAdd,
  }
}

test('renders NodePanel with title and cancel icon', async () => {
  const { onClose } = install()
  const cancelButton = screen.getByRole('button', {
    name: '×',
  })
  expect(
    screen.getByRole('heading', {
      name: 'Node Panel',
    }),
  ).toBeInTheDocument()
  expect(cancelButton).toBeInTheDocument()
  await userEvent.click(cancelButton)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('submits NodePanel form with new title and status', async () => {
  const { onModifySubmit } = install()

  const titleInput = screen.getByLabelText('Title')
  const submitButton = screen.getByText('Submit')
  expect(titleInput).toHaveValue(nodeData.label)
  await userEvent.clear(titleInput)
  await userEvent.type(titleInput, 'New Title')
  await userEvent.click(submitButton)

  await waitFor(() => {
    expect(onModifySubmit).toHaveBeenCalledTimes(1)
  })
  expect(onModifySubmit).toHaveBeenCalledWith({
    label: 'New Title',
    completed: 'true',
  })
})

test('deletes NodePanel node', async () => {
  const { onDelete } = install()

    const deleteButton = screen.getByRole('button', {
        name: 'Delete',
    })
    expect(deleteButton).toBeInTheDocument()
    await userEvent.click(deleteButton)
    expect(onDelete).toHaveBeenCalledTimes(1)
})

test('adds node', async () => {
  const { onAdd } = install()

  await userEvent.click(screen.getByText('New Nodes'))

  const addButton = screen.getByRole('button', {
      name: /plus Add field/i,
  })
  expect(addButton).toBeInTheDocument()
  await userEvent.click(addButton)
  await userEvent.type(screen.getByPlaceholderText(/node title/i), 'New Node')
  await userEvent.click(addButton)
  await userEvent.type(screen.getAllByPlaceholderText(/node title/i)[1], 'New Node 2')
  await userEvent.click(screen.getByText('Submit'))

  await waitFor(() => {
    expect(onAdd).toHaveBeenCalledTimes(1)
  })
  expect(onAdd).toHaveBeenCalledWith(nodeData.id, [
    'New Node',
    'New Node 2',
  ])
})

