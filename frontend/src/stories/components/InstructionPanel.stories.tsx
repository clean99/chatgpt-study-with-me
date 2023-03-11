import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import InstructionPanel from '../../components/KnowledgeGraph/components/InstructionPanel';
import { colorWithTitles, instruction } from '../../constants/graph';

export default {
  title: 'Components/InstructionPanel',
  component: InstructionPanel,
} as ComponentMeta<typeof InstructionPanel>;

const Template: ComponentStory<typeof InstructionPanel> = (args) => <div style={{ width: '96vw', height: '96vh' }}>
    <InstructionPanel {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  title: 'Knowledge Graph',
  colorWithTitles,
  instruction,
};
