import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabsComponent, { Tabs } from '../TabsComponent'

describe('TabsComponent', () => {
  it('renders two tabs with the correct titles', () => {
    render(<TabsComponent current={Tabs.MODIFY} setTab={jest.fn()} />)

    const modifyTab = screen.getByText('Modify')
    const increaseTab = screen.getByText('New Nodes')

    expect(modifyTab).toBeInTheDocument()
    expect(increaseTab).toBeInTheDocument()
  })

  it('calls setTab with the correct tab value when a tab is clicked', async () => {
    const setTabMock = jest.fn()
    render(<TabsComponent current={Tabs.MODIFY} setTab={setTabMock} />)

    const increaseTab = screen.getByText('New Nodes')
    await userEvent.click(increaseTab)

    expect(setTabMock).toHaveBeenCalledWith(Tabs.NEW_NODES)
  })

  it('applies the active class to the current tab', () => {
    render(<TabsComponent current={Tabs.MODIFY} setTab={jest.fn()} />)

    const modifyTab = screen.getByText('Modify')
    const increaseTab = screen.getByText('New Nodes')

    expect(modifyTab).toHaveClass('active')
    expect(increaseTab).not.toHaveClass('active')
  })
})
