import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextArea } from '../../components/Input'

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [value, setValue] = React.useState('')

  return <TextArea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Enter your name',
}

export const CanNotResize = Template.bind({})
CanNotResize.args = {
  disableResize: true,
  placeholder: 'Enter your age',
}
