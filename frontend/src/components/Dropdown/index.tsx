import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import  { type MenuProps as AntdMenuProps, Dropdown as AntdDropdown, Space } from 'antd';

export type MenuProps =  AntdMenuProps['items'];

export interface DropdownProps {
    menu: {
        items: MenuProps;
    };
    Avatar?: React.FC;
    text: string;
}

const Dropdown: React.FC<DropdownProps> = ({ text, menu, Avatar }) => (
  <AntdDropdown menu={menu}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {Avatar && <Avatar />}
        {text}
        <DownOutlined />
      </Space>
    </a>
  </AntdDropdown>
);

export default Dropdown;
