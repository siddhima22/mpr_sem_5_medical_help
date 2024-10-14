import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', children, ...props }) => {
  const baseClasses = 'py-2 px-4 rounded focus:outline-none focus:ring transition-colors';
  const variantClasses =
    variant === 'outline'
      ? 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
