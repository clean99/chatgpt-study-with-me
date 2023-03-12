import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ConversationPage from '../../pages/ConversationPage'

export default {
  title: 'Pages/ConversationPage',
  component: ConversationPage,
} as ComponentMeta<typeof ConversationPage>

const Template: ComponentStory<typeof ConversationPage> = (args) => <ConversationPage {...args} />

export const Default = Template.bind({})
Default.args = {}
