import React from 'react';

export function CalculatorButton({ 
  value, 
  onClick, 
  variant = 'default',
  colspan = 1
}) {
  const getButtonStyle = () => {
    const baseStyle = {
      fontSize: '1.25rem',
      padding: '1rem',
      fontWeight: '400',
      borderRadius: '0.25rem',
      height: 'auto',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      border: 'none',
      outline: 'none',
      gridColumn: colspan === 2 ? 'span 2' : 'span 1',
      width: '100%'
    };

    switch (variant) {
      case 'clear':
        return {
          ...baseStyle,
          backgroundColor: '#ef4444',
          color: 'white',
        };
      case 'operator':
        return {
          ...baseStyle,
          backgroundColor: '#e5e7eb',
          color: '#374151',
        };
      case 'equals':
        return {
          ...baseStyle,
          backgroundColor: '#2563eb',
          color: 'white',
        };
      case 'number':
        return {
          ...baseStyle,
          backgroundColor: 'white',
          color: '#374151',
          border: '1px solid #e5e7eb',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={getButtonStyle()}
    >
      {value}
    </button>
  );
}