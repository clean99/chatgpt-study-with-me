import React from 'react'
import { Layout as AntdLayout, Skeleton, Space } from 'antd'
import NavigationBar from '../NavigationBar'
import Footer from '../Footer'
import useAuth from '../../hooks/useAuth'

const { Content } = AntdLayout

export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sessionContext, userInfo, logoutClicked } = useAuth();
  const dropdownOptions = [
    { label: 'Log out', key: '3', onClick: () => logoutClicked()},
  ]
  const navigationMenuItems = [
    { label: 'Home', key: 'home' },
    { label: 'About', key: 'about' },
    { label: 'Contact', key: 'contact' },
  ]

  if(sessionContext.loading) {
    <Skeleton />
  }


  return (
    <Space direction='vertical'  style={{ width: '100%' }} size={[0, 48]}>
      <AntdLayout className='min-h-screen max-w-screen'>
        <NavigationBar isLogin={(sessionContext as any).userId} navigationMenuItems={navigationMenuItems} username={userInfo.email ?? ''} dropdownOptions={dropdownOptions} />
        <Content className='px-4 py-4'>{children}</Content>
        <Footer />
      </AntdLayout>
    </Space>
  ) 
}
export default Layout
