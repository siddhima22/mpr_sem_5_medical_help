import React from 'react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
};

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

export { Card, CardHeader, CardContent, CardTitle };
