import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../../components/Button'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me</Button>

export const Primary = Template.bind({})
Primary.args = { type: 'primary' }

export const Secondary = Template.bind({})
Secondary.args = { type: 'secondary' }

export const Danger = Template.bind({})
Danger.args = { type: 'danger' }

export const Link = Template.bind({})
Link.args = { type: 'link' }
