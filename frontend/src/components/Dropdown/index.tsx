import React from 'react'
import style from './index.module.scss'
import { DownOutlined } from '@ant-design/icons'
import { type MenuProps as AntdMenuProps, Dropdown as AntdDropdown, Space } from 'antd'

export type MenuProps = AntdMenuProps['items']

export interface DropdownProps {
  menu: {
    items: MenuProps
  }
  Icon?: React.FC
  text: string
}

const Dropdown: React.FC<DropdownProps> = ({ text, menu, Icon }) => (
  <AntdDropdown className={style.dropdown} menu={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space role={'menuitem'}>
        {Icon && <Icon />}
        {text}
        <DownOutlined />
      </Space>
    </a>
  </AntdDropdown>
)

export default Dropdown
