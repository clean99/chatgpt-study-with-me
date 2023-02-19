// Avatar.tsx

import React, { useState } from 'react'
import './index.scss'

export interface AvatarProps {
  src?: string
  size: 'small' | 'medium' | 'large'
  username: string
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ src, size, username, onClick }) => {
  const classNames = `avatar avatar--${size}`
  const [isSrcValid, setIsSrcValid] = useState(src ? true : false)

  const handleSrcError = () => {
    setIsSrcValid(false)
  }

  return (
    <div className={classNames} onClick={onClick}>
      {isSrcValid ? (
        <img src={src} alt={username} onError={handleSrcError} />
      ) : (
        <div className={`avatar--font avatar--font--${size}`}>{username.charAt(0)}</div>
      )}
    </div>
  )
}

export default Avatar
