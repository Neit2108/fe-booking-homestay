import React, { useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';

  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`${styles.input} ${error ? styles.error : ''} ${isPasswordType ? 'pr-10' : ''}`}
          required={required}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center justify-center"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1} // tránh tab-focus vào nút
          >
            <img
              src="/src/assets/Register/eye-icon.png"
              alt={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className="w-4 h-4 object-contain"
            />
          </button>
        )}
      </div>
      
      {helperText && (
        <div className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input;