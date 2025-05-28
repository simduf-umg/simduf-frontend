import React from 'react';

interface SpinnerOneProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16'
};

const SpinnerOne: React.FC<SpinnerOneProps> = ({ size = 'md' }) => {
  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-300 border-t-brand-500 dark:border-gray-600 dark:border-t-brand-400`}></div>
  );
};

export default SpinnerOne;