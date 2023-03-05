import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TabsComponent, { Tabs } from '../../components/TabsComponent';

export default {
  title: 'Components/TabsComponent',
  component: TabsComponent,
} as ComponentMeta<typeof TabsComponent>;

const Template: ComponentStory<typeof TabsComponent> = (args) => {
  const [currentTab, setCurrentTab] = useState(Tabs.MODIFY);

  return <TabsComponent {...args} current={currentTab} setTab={setCurrentTab} />;
};

export const Default = Template.bind({});
Default.args = {};
