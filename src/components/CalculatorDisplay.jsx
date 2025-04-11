import React from 'react';

export function CalculatorDisplay({ value }) {
    const displayStyle = {
      width: '100%',
      textAlign: 'right',
      fontSize: '1.5rem',
      padding: '0.75rem 1rem', // Reduce padding slightly
      height: '3.5rem',        // Adjust height to match
      fontFamily: 'monospace',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.25rem',
      outline: 'none',
      boxSizing: 'border-box',
      margin: '0', // Remove auto margin
      display: 'block'
    };
  

  const containerStyle = {
    width: '100%',
    padding: '0',
    margin: '0'
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={value}
        readOnly
        style={displayStyle}
        placeholder="0"
      />
    </div>
  );
}