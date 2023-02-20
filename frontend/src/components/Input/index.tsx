import * as React from 'react'
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd'
import { TextAreaProps as AntdTextAreaProps } from 'antd/es/input'
import ThemeProvider from '../ThemeProvider'

export type InputProps = AntdInputProps
const { TextArea: AntdTextArea } = AntdInput

export const Input: React.FC<InputProps> = (props) => {
  return (
    <ThemeProvider>
      <AntdInput {...props} />
    </ThemeProvider>
  )
}

export interface TextAreaProps extends AntdTextAreaProps {
  disableResize?: boolean
}

export const TextArea: React.FC<TextAreaProps> = ({ disableResize, ...props }) => {
  return (
    <ThemeProvider>
      <AntdTextArea style={disableResize ? { resize: 'none' } : {}} {...props} />
    </ThemeProvider>
  )
}
