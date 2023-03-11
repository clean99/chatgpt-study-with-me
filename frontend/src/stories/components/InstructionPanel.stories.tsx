import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import InstructionPanel from '../../components/KnowledgeGraph/components/InstructionPanel';
import {  COLOR_WITH_TITLES, INSTRUCTION, INSTRUCTION_TITLE } from '../../constants/graph';

export default {
  title: 'Components/InstructionPanel',
  component: InstructionPanel,
} as ComponentMeta<typeof InstructionPanel>;

const Template: ComponentStory<typeof InstructionPanel> = (args) => <div style={{ width: '96vw', height: '96vh' }}>
    <InstructionPanel {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  title: INSTRUCTION_TITLE,
  colorWithTitles: COLOR_WITH_TITLES,
  instruction: INSTRUCTION,
  visible: true,
};
