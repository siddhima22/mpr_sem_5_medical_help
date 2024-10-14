import React, { useState } from 'react';

interface TabsProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ children, value, onValueChange }) => {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { active: value === child.props.value, onValueChange })
          : child
      )}
    </div>
  );
};

const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={`flex space-x-4 ${className}`}>{children}</div>;
};

const TabsTrigger: React.FC<{ value: string; active: boolean; onValueChange: (value: string) => void }> = ({
  value,
  active,
  onValueChange,
  children,
}) => {
  return (
    <button
      className={`py-2 px-4 rounded ${active ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<{ value: string; active: boolean; children: React.ReactNode; className?: string }> = ({
  value,
  active,
  children,
  className,
}) => {
  return active ? <div className={className}>{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
