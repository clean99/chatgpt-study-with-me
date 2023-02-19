import React from 'react';
import './index.scss';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'primary', size = 'medium',   onClick, children, disabled }) => {
  const classNames = `button button--${type} button--${size}`;

  return (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
