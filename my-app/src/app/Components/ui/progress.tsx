import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded ${className}`}>
      <div className={`absolute left-0 top-0 h-full bg-blue-600 rounded`} style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default Progress;
