import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HomePage from '../../pages/HomePage';
import { PostWithDescriptionProps, PhotoPosition } from '../../components/PostWithDescription';

export default {
  title: 'Pages/HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => <HomePage {...args} />;

const posts: PostWithDescriptionProps[] = [
    {
      title: 'Feature 1',
      description:
        'This is a description of feature 1. It is a really great feature that will help you do awesome things!',
      photo: 'https://picsum.photos/400',
      position: PhotoPosition.LEFT,
      withEffect: true,
    },
    {
      title: 'Feature 2',
      description:
        'This is a description of feature 2. It is a really great feature that will help you do awesome things!',
      photo: 'https://picsum.photos/500',
      position: PhotoPosition.RIGHT,
      withEffect: true,
    },
    {
      title: 'Feature 3',
      description:
        'This is a description of feature 3. It is a really great feature that will help you do awesome things!',
      photo: 'https://picsum.photos/600',
      position: PhotoPosition.LEFT,
      withEffect: true,
    },
]

export const Default = Template.bind({});
Default.args = {
 posts,
};
