import * as React from 'react'
import { ConfigProvider } from 'antd'
import { red } from '@ant-design/colors'

export type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { children } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: red.primary,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
