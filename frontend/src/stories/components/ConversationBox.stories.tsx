import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ConversationBox from '../../components/ConversationBox';
import { UserType } from '../../types/types';

export default {
  title: 'Components/ConversationBox',
  component: ConversationBox,
} as ComponentMeta<typeof ConversationBox>;

const Template: ComponentStory<typeof ConversationBox> = (args) => (
  <ConversationBox {...args} />
);

export const Example = Template.bind({});
Example.args = {
  response: [
    { text: 'Hello, how can I help you?', type: UserType.BOT },
    { text: 'I have a question about your product.', type: UserType.USER },
    { text: 'Sure, what would you like to know?', type: UserType.BOT },
    { text: 'Is there a free trial available?', type: UserType.USER },
    { text: 'Yes, we offer a 14-day free trial.', type: UserType.BOT },
  ],
};
