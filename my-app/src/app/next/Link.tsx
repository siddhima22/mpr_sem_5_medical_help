import React, { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  [key: string]: any; // For additional props like onClick, etc.
}

const Link: React.FC<LinkProps> = ({ href, children, className, target, rel, ...props }) => {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : rel}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
