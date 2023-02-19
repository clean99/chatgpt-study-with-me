import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown, { MenuProps } from '../../components/Dropdown';
import { SmileOutlined } from '@ant-design/icons';
import Avatar from '../../components/Avatar';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const options: MenuProps = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

const Template: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <Dropdown {...args} />
  );
};

export const Default = Template.bind({});

Default.args = {
    text: 'Username',
    Icon: () => <Avatar src="https://picsum.photos/200" size="small" username="Alice Smith" onClick={action('clicked')} />,
    menu: {
        items: options,
    },
}

export const NoAvatar = Template.bind({});

NoAvatar.args = {
    text: 'Username',
    menu: {
        items: options,
    },
}

export const NoText = Template.bind({});
NoText.args = {
    Icon: () => <Avatar src="https://picsum.photos/200" size="small" username="Alice Smith" onClick={action('clicked')} />,
    menu: {
        items: options,
    },
}
