import * as React from 'react'
import './index.scss'
import Dropdown, { MenuProps as DropdownMenuProps } from '../Dropdown'
import Avatar from '../Avatar'
import { TranslationOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export interface NavigationMenuItems {
  label: string
  key: string
  onClick?: () => void
}

export interface NavigationBarProps {
  username: string
  avatarSrc?: string
  dropdownOptions: DropdownMenuProps
  isLogin?: boolean
  navigationMenuItems: NavigationMenuItems[]
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  username,
  avatarSrc,
  dropdownOptions,
  navigationMenuItems,
  isLogin,
}) => {
  const navigate = useNavigate()
  return (
    <div className='navigation-bar'>
      <div className='navigation-bar__menulogo'>
        <img src='/logo.svg' alt='logo' className='navigation-bar__logo' />
        <div className='navigation-bar__menu' role={'menu'}>
          {navigationMenuItems.map((item) => (
            <div
              className='navigation-bar__menu-item'
              key={item.key}
              onClick={item.onClick}
              role={'menuitem'}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className='navigation-bar__icons'>
        <div className='navigation-bar__icon'>
          <TranslationOutlined />
        </div>
        <div className='navigation-bar__icon'>
          <QuestionCircleOutlined />
        </div>
        <div className='navigation-bar__icon'>
          {isLogin ? (
            <div className='navigation-bar__dropdown'>
              <Dropdown
                menu={{ items: dropdownOptions }}
                Icon={() => <Avatar size={'small'} src={avatarSrc} username={username} />}
                text={username}
              />
            </div>
          ) : (
            <Button type='text' onClick={() => navigate('/auth')}>
              Log In
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
