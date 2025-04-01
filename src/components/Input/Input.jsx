import React from 'react';
import styles from './Input.module.css';

const Input = ({
  id,
  label,
  type = 'text',
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        required={required}
        {...props}
      />
      
      {helperText && (
        <div className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input;