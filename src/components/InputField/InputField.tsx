import React from 'react';
import clsx from 'clsx'; // Import the clsx library

// The props interface remains the same
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  variant = 'outlined', // Default variant is 'outlined'
  size = 'md', // Default size is 'md'
  disabled,
  invalid,
  helperText,
  errorMessage,
  ...props
}) => {

  // Define base classes that apply to all variants
  const baseClasses = "w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

  // Define classes for each variant
  const variantClasses = {
    filled: 'bg-gray-100 border-transparent',
    outlined: 'border-gray-300 border',
    ghost: 'border-transparent bg-transparent hover:bg-gray-100',
  };

  // Define classes for each size
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  // Combine all classes using clsx
  const inputClassName = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      'opacity-50 cursor-not-allowed': disabled, // Apply if disabled is true
      'border-red-500 text-red-600 focus:ring-red-500': invalid, // Apply if invalid is true
    }
  );

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input 
        className={inputClassName}
        placeholder={placeholder}
        disabled={disabled}
        {...props} 
      />
      {helperText && !invalid && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {errorMessage && invalid && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};