import React, { useState, useEffect } from 'react';

const Counter = ({ 
  end, 
  duration = 2000, 
  className = '',
  suffix = '',
  prefix = ''
}) => {
  const [count, setCount] = useState(0);
  const isPercentage = typeof end === 'string' && end.endsWith('%');
  const numericValue = isPercentage ? parseFloat(end) : end;
  
  useEffect(() => {
    // Calculate increment step based on duration (60fps)
    const frames = (duration / 1000) * 60;
    const increment = numericValue / frames;
    
    let currentCount = 0;
    const timer = setInterval(() => {
      currentCount += increment;
      
      if (currentCount >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(isPercentage ? parseFloat(currentCount.toFixed(1)) : Math.ceil(currentCount));
      }
    }, 1000 / 60); // 60fps
    
    return () => clearInterval(timer);
  }, [numericValue, duration, isPercentage]);
  
  // Format the displayed value
  const displayValue = isPercentage 
    ? `${count.toFixed(0)}%` 
    : count.toLocaleString() + (suffix || '');
  
  return (
    <span className={className}>
      {prefix}{displayValue}
    </span>
  );
};

export default Counter;
