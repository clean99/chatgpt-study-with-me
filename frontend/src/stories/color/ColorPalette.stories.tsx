import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { red } from '@ant-design/colors';

import ColorPalette from './ColorSwatch';
import ColorSwatch from './ColorSwatch';

export default {
  title: 'Example/ColorPalette',
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>;

const colors = [
  { name: 'Background', code: red[0], usage: 'Used for background and borders of cards and other components.' },
  { name: 'Border', code: red[1], usage: 'Used for borders and backgrounds of form elements and input fields.' },
  { name: 'Accent 1', code: red[3], usage: 'Used for call-to-action buttons and important highlights.' },
  { name: 'Accent 2', code: red[4], usage: 'Used for progress bars and sliders.' },
  { name: 'Accent 3', code: red[5], usage: 'Used for alert messages and error indicators.' },
  { name: 'Primary', code: red[6], usage: 'Used for primary buttons, important messages, and errors.' },
  { name: 'Danger', code: red[7], usage: 'Used for error messages and validation errors.' },
  { name: 'Warning', code: red[8], usage: 'Used for warning messages and important notifications.' },
  { name: 'Dark', code: red[9], usage: 'Used for text on light backgrounds and other low-visibility areas.' },
  { name: 'Text', code: red[10], usage: 'Used for text and icons in the footer and other low-visibility areas.' },
];

const Template: ComponentStory<any> = () => (
  <div>
    <h1>Color Template</h1>
    {colors.map(color => (
      <ColorSwatch name={color.name} code={color.code} usage={color.usage} />
    ))}
  </div>
);

export const Color = Template.bind({});
