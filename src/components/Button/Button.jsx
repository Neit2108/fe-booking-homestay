import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  dataTestid = '',
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestid}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;