import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavigationBar from '../../components/NavigationBar';

export default {
  title: 'NavigationBar',
  component: NavigationBar,
} as ComponentMeta<typeof NavigationBar>;

const Template: ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  username: 'John Doe',
  avatarSrc: 'https://picsum.photos/200',
  navigationMenuItems: [
    { label: 'Home', key: 'home' },
    { label: 'About', key: 'about' },
    { label: 'Contact', key: 'contact' },
  ],
  dropdownOptions: [
    { label: 'Profile', key: '1', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', key: '2', onClick: () => console.log('Settings clicked') },
    { label: 'Log out', key: '3', onClick: () => console.log('Log out clicked') },
  ],
};
