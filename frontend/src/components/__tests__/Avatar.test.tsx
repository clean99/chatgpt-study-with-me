import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Avatar, { AvatarProps } from '../Avatar'

describe('Avatar', () => {
  const defaultProps: AvatarProps = {
    src: 'https://picsum.photos/200',
    size: 'small',
    username: 'Alice Smith',
  }

  it('renders with image when src is valid', () => {
    render(<Avatar {...defaultProps} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders with initial when src is invalid', () => {
    render(<Avatar {...defaultProps} src={undefined} />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', async () => {
    const onClick = jest.fn()
    render(<Avatar {...defaultProps} onClick={onClick} />)
    const avatar = screen.getByRole('img')
    await userEvent.click(avatar)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
