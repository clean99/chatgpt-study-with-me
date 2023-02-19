import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown, { DropdownProps, MenuProps } from '../Dropdown';

describe('Dropdown', () => {
  const menuItems: MenuProps = [
    {
        label: 'Menu Item 1',
        key: '1',
    },
    {
        label: 'Menu Item 2',
        key: '2',
    },
  ];
  const defaultProps: DropdownProps = {
    text: 'Dropdown',
    menu: { items: menuItems },
  };

  it('renders the text and the down arrow', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
    expect(screen.getByLabelText('down')).toBeInTheDocument();
  });

  it('renders the avatar if provided', () => {
    const Avatar = () => <div>Avatar</div>;
    render(<Dropdown {...defaultProps} Icon={() => <Avatar />} />);
    expect(screen.getByText('Avatar')).toBeInTheDocument();
  });

  it('opens the dropdown when hover', async () => {
    render(<Dropdown {...defaultProps} />);
    const dropdownToggle = screen.getByText(defaultProps.text);
    userEvent.hover(dropdownToggle);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const option1 = await screen.findByText((menuItems)[0].label);
    expect(option1).toBeInTheDocument();
  });
});
