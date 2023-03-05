import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import NodePanel from '../../components/NodePanel'
import Button from '../../components/Button'

export default {
  title: 'Components/NodePanel',
  component: NodePanel,
} as ComponentMeta<typeof NodePanel>

const Template: ComponentStory<typeof NodePanel> = (args) => {
  const [isVisible, setIsVisible] = React.useState(args.isVisible)
  return (
    <>
      <NodePanel {...args} isVisible={isVisible} onClose={() => setIsVisible(false)} />
      <Button onClick={() => setIsVisible(!isVisible)}>Toggle</Button>
    </>
  )
}

const nodeData = {
  id: 'node1',
  label: 'Node 1',
  completed: false,
}

export const Default = Template.bind({})
Default.args = {
  x: 100,
  y: 100,
  nodeData: nodeData,
  isVisible: true,
  onClose: () => 'onClose',
}

export const Completed = Template.bind({})
Completed.args = {
  ...Default.args,
  nodeData: {
    ...nodeData,
    completed: true,
  },
}

export const Hidden = Template.bind({})
Hidden.args = {
  ...Default.args,
  isVisible: false,
}

export const OtherPlace = Template.bind({})
OtherPlace.args = {
  ...Default.args,
  x: 300,
  y: 300,
}
