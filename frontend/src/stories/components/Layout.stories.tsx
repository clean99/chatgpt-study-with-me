import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Layout from '../../components/Layout'

export default {
  title: 'Components/Layout',
  component: Layout,
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <div style={{ height: '2000px' }}>Content</div>,
}
