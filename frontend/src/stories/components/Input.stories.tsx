import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input } from '../../components/Input'

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = React.useState('')

  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Default = Template.bind({})
Default.args = {
  type: 'text',
  placeholder: 'Enter your name',
}

export const Number = Template.bind({})
Number.args = {
  type: 'number',
  placeholder: 'Enter your age',
}
