import React, { useEffect } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { useCalculator } from "../hooks/useCalculator";

export function Calculator() {
  const {
    displayValue,
    calculationResult,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleClear,
    handleCalculate,
  } = useCalculator();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[0-9]$/.test(event.key)) {
        handleNumber(event.key);
      } 
      else if (['+', '-', '*', '/'].includes(event.key)) {
        handleOperator(event.key);
      }
      else if (['(', ')'].includes(event.key)) {
        handleOperator(event.key);
      }
      else if (event.key === '.') {
        handleDecimal();
      }
      else if (event.key === 'Enter' || event.key === '=') {
        handleCalculate();
      }
      else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, handleDecimal, handleCalculate, handleClear]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '1rem',
    backgroundColor: '#f3f4f6'
  };

  const calculatorStyle = {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle = {
    backgroundColor: '#3b82f6',
    padding: '1rem',
    color: 'white'
  };

  const displayStyle = {
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  };

  const resultStyle = {
    marginTop: '0.5rem',
    padding: '0.5rem',
    textAlign: 'right',
    fontSize: '1.25rem',
    fontWeight: '500',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem'
  };

  const buttonsContainerStyle = {
    padding: '1rem',
    backgroundColor: 'white'
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.5rem'
  };

  const footerStyle = {
    backgroundColor: '#f9fafb',
    padding: '0.75rem 1rem',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '0.875rem'
  };

  const buttonStyle = {
    fontSize: '1.25rem',
    padding: '1rem',
    fontWeight: '400',
    borderRadius: '0.25rem',
    height: 'auto',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    border: 'none',
    outline: 'none',
    width: '100%'
  };

  const numberButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'white',
    color: '#374151',
    border: '1px solid #e5e7eb',
  };

  const operatorButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e5e7eb',
    color: '#374151',
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444',
    color: 'white',
  };

  const equalsButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: 'white',
  };

  const zeroButtonStyle = {
    ...numberButtonStyle,
    gridColumn: 'span 2',
  };

  return (
    <div style={containerStyle}>
      <div style={calculatorStyle}>
        <div style={headerStyle}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Calculator</h1>
        </div>
        
        <div style={displayStyle}>
          <CalculatorDisplay value={displayValue} />
          
          {/* Result div to display calculation results */}
          <div style={resultStyle} data-testid="calculation-result">
            {calculationResult || ' '}
          </div>
        </div>
        
        <div style={buttonsContainerStyle}>
          <div style={buttonGridStyle}>
            {/* First Row */}
            <button style={clearButtonStyle} onClick={handleClear}>C</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('(')}>(</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator(')')}>)</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('/')} data-operator="/">/</button>
            
            {/* Second Row */}
            <button style={numberButtonStyle} onClick={() => handleNumber('7')}>7</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('8')}>8</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('9')}>9</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('*')} data-operator="*">*</button>
            
            {/* Third Row */}
            <button style={numberButtonStyle} onClick={() => handleNumber('4')}>4</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('5')}>5</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('6')}>6</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('-')} data-operator="-">-</button>
            
            {/* Fourth Row */}
            <button style={numberButtonStyle} onClick={() => handleNumber('1')}>1</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('2')}>2</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('3')}>3</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('+')} data-operator="+">+</button>
            
            {/* Fifth Row */}
            <button style={zeroButtonStyle} onClick={() => handleNumber('0')}>0</button>
            <button style={numberButtonStyle} onClick={handleDecimal}>.</button>
            <button style={equalsButtonStyle} onClick={handleCalculate}>=</button>
          </div>
        </div>
        
        <div style={footerStyle}>
          <p>Press C to clear the calculator</p>
        </div>
      </div>
    </div>
  );
}