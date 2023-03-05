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
})

test('renders NodePanel with title and cancel icon', async () => {
  const onClose = jest.fn()
  render(
    <NodePanel
      x={0}
      y={0}
      nodeData={nodeData}
      isVisible={true}
      onClose={onClose}
      onSubmit={() => 'onSubmit'}
    />,
  )
  const cancelButton = screen.getByRole('button', {
    name: '×',
  })
  expect(
    screen.getByRole('heading', {
      name: 'Modify Node',
    }),
  ).toBeInTheDocument()
  expect(cancelButton).toBeInTheDocument()
  await userEvent.click(cancelButton)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('submits NodePanel form with new title and status', async () => {
  const onSubmit = jest.fn()
  render(
    <NodePanel
      x={0}
      y={0}
      nodeData={nodeData}
      isVisible={true}
      onClose={() => 'onClose'}
      onSubmit={onSubmit}
    />,
  )
  const titleInput = screen.getByLabelText('Title')
  const submitButton = screen.getByText('Submit')
  expect(titleInput).toHaveValue(nodeData.label)
  await userEvent.clear(titleInput)
  await userEvent.type(titleInput, 'New Title')
  await userEvent.click(submitButton)

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
  expect(onSubmit).toHaveBeenCalledWith({
    label: 'New Title',
    completed: 'true',
  })
})
