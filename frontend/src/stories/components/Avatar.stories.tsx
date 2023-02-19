import { Meta, Story } from '@storybook/react';
import Avatar, { AvatarProps } from '../../components/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://picsum.photos/200',
  size: 'small',
  username: 'Alice Smith',
};

export const NoSrc = Template.bind({});
NoSrc.args = {
  size: 'small',
  username: 'Bob Johnson',
};

export const Medium = Template.bind({});
Medium.args = {
  src: 'https://picsum.photos/200',
  size: 'medium',
  username: 'Charlie Brown',
};

export const Large = Template.bind({});
Large.args = {
  src: 'https://picsum.photos/200',
  size: 'large',
  username: 'David Lee',
};
