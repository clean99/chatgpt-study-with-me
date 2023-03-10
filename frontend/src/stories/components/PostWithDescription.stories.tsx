import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PostWithDescription, { PhotoPosition } from '../../components/PostWithDescription'

export default {
  title: 'Components/PostWithDescription',
  component: PostWithDescription,
} as ComponentMeta<typeof PostWithDescription>

const Template: ComponentStory<typeof PostWithDescription> = (args) => (
  <PostWithDescription {...args} />
)

export const PostWithDescriptionExample = Template.bind({})
PostWithDescriptionExample.args = {
  title: 'My Title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante ante. Donec consequat, arcu at blandit laoreet, elit elit accumsan sapien, vel hendrerit enim dolor et nunc.',
  photo: 'https://picsum.photos/400',
  position: PhotoPosition.LEFT,
  withEffect: true,
}

export const PhotoAtRight = Template.bind({})
PhotoAtRight.args = {
  title: 'My Title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante ante. Donec consequat, arcu at blandit laoreet, elit elit accumsan sapien, vel hendrerit enim dolor et nunc.',
  photo: 'https://picsum.photos/400',
  position: PhotoPosition.RIGHT,
  withEffect: true,
}

export const WithoutEffect = Template.bind({})
WithoutEffect.args = {
  title: 'My Title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ante ante. Donec consequat, arcu at blandit laoreet, elit elit accumsan sapien, vel hendrerit enim dolor et nunc.',
  photo: 'https://picsum.photos/400',
  position: PhotoPosition.LEFT,
  withEffect: false,
}
