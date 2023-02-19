import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NavigationBar, { NavigationBarProps } from '../NavigationBar';

describe('NavigationBar', () => {
  const defaultOptions = [
    { label: 'Home', key: 'home' },
    { label: 'About', key: 'about' },
    { label: 'Contact', key: 'contact' },
  ];

  const defaultDropdownOptions = [
    { label: 'Profile', key: '1', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', key: '2', onClick: () => console.log('Settings clicked') },
    { label: 'Log out', key: '3', onClick: () => console.log('Log out clicked') },
  ];

  const defaultProps: NavigationBarProps = {
    username: 'John Doe',
    dropdownOptions: defaultDropdownOptions,
    navigationMenuItems: defaultOptions,
  };

  it('renders the logo, menu items, and icons', () => {
    render(<NavigationBar {...defaultProps} />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'translation' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'question-circle' })).toBeInTheDocument();
  });

  it('renders the username in the dropdown', async () => {
    render(<NavigationBar {...defaultProps} />);
    const dropdown = screen.getByText(defaultProps.username);
    expect(dropdown).toBeInTheDocument();
  });

  it('calls onClick handler when menu item is clicked', async () => {
    const onClick = jest.fn();
    const optionsWithClick: NavigationBarProps['navigationMenuItems'] = [
      { label: 'Home', key: 'home', onClick },
      { label: 'About', key: 'about' },
      { label: 'Contact', key: 'contact' },
    ];
    render(<NavigationBar {...defaultProps} navigationMenuItems={optionsWithClick} />);
    const menuItem = screen.getByText('Home');
    await userEvent.click(menuItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
