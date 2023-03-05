import React from 'react'
import './index.scss'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger' | 'link'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  htmlType?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  onClick,
  children,
  disabled,
  htmlType = 'button'
}) => {
  const classNames = `button button--${type} button--${size}`

  return (
    <button disabled={disabled} className={classNames} onClick={onClick} type={htmlType}>
      {children}
    </button>
  )
}

export default Button
