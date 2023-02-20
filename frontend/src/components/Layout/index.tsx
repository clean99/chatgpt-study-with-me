import React from 'react'
import { Layout as AntdLayout, Space } from 'antd'
import NavigationBar from '../NavigationBar'
import Footer from '../Footer'

const { Content } = AntdLayout

const navigationBarArgs = {
  username: 'John Doe',
  avatarSrc: 'https://picsum.photos/200',
  navigationMenuItems: [
    { label: 'Home', key: 'home' },
    { label: 'About', key: 'about' },
    { label: 'Contact', key: 'contact' },
  ],
  dropdownOptions: [
    { label: 'Profile', key: '1', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', key: '2', onClick: () => console.log('Settings clicked') },
    { label: 'Log out', key: '3', onClick: () => console.log('Log out clicked') },
  ],
}

export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
    <AntdLayout>
      <NavigationBar {...navigationBarArgs} />
      <Content>{children}</Content>
      <Footer />
    </AntdLayout>
  </Space>
)

export default Layout
