import React, { useEffect, useState, useRef } from "react";
import { useCalculator } from "../hooks/useCalculator";

export function Calculator() {
  const {
    displayValue,
    calculationResult,
    hasError,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleClear,
    handleCalculate,
  } = useCalculator();

  // For flashing effect
  const [flashOpacity, setFlashOpacity] = useState(0);
  // For creepy message
  const [creepyMessage, setCreepyMessage] = useState('');
  const fullMessage = "row by row they shadow scrap, one by one they fall asleep";
  const messageIndex = useRef(0);
  const animationRef = useRef(null);
  const direction = useRef(1); // 1 for increasing, -1 for decreasing
  const messageTimerRef = useRef(null);

  // Effect to handle the continuous flashing and creepy message
  useEffect(() => {
    if (hasError) {
      // Function to animate the flashing
      const animateFlash = () => {
        setFlashOpacity(prev => {
          // Change direction when reaching limits
          if (prev >= 0.85) direction.current = -1;
          if (prev <= 0.15) direction.current = 1;
          
          // Slowly increment/decrement opacity
          return prev + direction.current * 0.01;
        });
        
        // Continue animation
        animationRef.current = requestAnimationFrame(animateFlash);
      };
      
      // Start the flashing animation
      animationRef.current = requestAnimationFrame(animateFlash);
      
      // Start the creepy message animation - reset message and index
      messageIndex.current = 0;
      setCreepyMessage('');
      
      // Function to type the message character by character
      const typeCreepyMessage = () => {
        if (messageIndex.current < fullMessage.length) {
          // Add character by character - use substring to get the whole message up to current index
          setCreepyMessage(fullMessage.substring(0, messageIndex.current + 1));
          messageIndex.current++;
          // Schedule next character
          messageTimerRef.current = setTimeout(typeCreepyMessage, 200); // Speed of typing
        } else {
          // When message is complete, pause then restart
          messageTimerRef.current = setTimeout(() => {
            messageIndex.current = 0;
            setCreepyMessage('');
            typeCreepyMessage();
          }, 2000); // Pause for 2 seconds before restarting
        }
      };
      
      // Start typing
      typeCreepyMessage();
      
      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (messageTimerRef.current) {
          clearTimeout(messageTimerRef.current);
        }
      };
    } else {
      // Reset when not in error state
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
      setFlashOpacity(0);
      setCreepyMessage('');
    }
  }, [hasError]);

  // Clear handler that also resets the animation
  const handleClearWithReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
    setFlashOpacity(0);
    setCreepyMessage('');
    handleClear();
  };

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
        handleClearWithReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, handleDecimal, handleCalculate]);

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
    color: 'white',
    textAlign: 'center'
  };

  const displayStyle = {
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb'
  };

  const inputContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '60px', // Increased height
  };

  const inputStyle = {
    width: '100%',
    height: '100%', // Make it fill the container
    padding: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '500',
    textAlign: 'right',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    outline: 'none',
    boxSizing: 'border-box',
    paddingRight: '12px',
    backgroundColor: 'white',
    color: hasError ? '#dc2626' : '#374151',
  };

  const creepyMessageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#dc2626',
    fontFamily: '"Courier New", monospace',
    fontSize: 'clamp(10px, 2.5vw, 16px)', // Smaller font
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 3,
    opacity: hasError ? 1 : 0,
    pointerEvents: 'none',
    letterSpacing: '0.5px', // Reduced letter spacing
    textShadow: '0 0 5px rgba(220, 38, 38, 0.8)',
    borderRadius: '0.25rem',
    padding: '0 5px',
    whiteSpace: 'nowrap', // Prevent wrapping
    overflow: 'visible', // Allow overflow
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(220, 38, 38, ' + flashOpacity + ')',
    borderRadius: '0.25rem',
    pointerEvents: 'none',
    mixBlendMode: 'multiply',
    zIndex: 2
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
          <div style={inputContainerStyle}>
            <input 
              type="text" 
              value={hasError ? '' : displayValue}
              readOnly
              style={inputStyle}
            />
            {/* Red flash overlay */}
            <div style={overlayStyle}></div>
            {/* Creepy message */}
            {hasError && (
              <div style={creepyMessageStyle}>
                {creepyMessage}
                <span style={{ opacity: Math.sin(Date.now() / 200) * 0.5 + 0.5 }}>|</span> {/* Blinking cursor */}
              </div>
            )}
          </div>
          
          {/* Hidden div for test compatibility */}
          <div style={{display: 'none'}} data-testid="calculation-result">
            {calculationResult || ''}
          </div>
        </div>
        
        <div style={buttonsContainerStyle}>
          <div style={buttonGridStyle}>
            {/* First Row */}
            <button style={clearButtonStyle} onClick={handleClearWithReset}>C</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('(')}>(</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator(')')}>)</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('/')}>/</button>
            
            {/* Second Row */}
            <button style={numberButtonStyle} onClick={() => handleNumber('7')}>7</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('8')}>8</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('9')}>9</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('*')}>*</button>
            
            {/* Third Row */}
            <button style={numberButtonStyle} onClick={() => handleNumber('4')}>4</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('5')}>5</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('6')}>6</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('-')}>-</button>
            
            {/* Fourth Row */}
            <button style={numberButtonStyle} onClick={() => handleNumber('1')}>1</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('2')}>2</button>
            <button style={numberButtonStyle} onClick={() => handleNumber('3')}>3</button>
            <button style={operatorButtonStyle} onClick={() => handleOperator('+')}>+</button>
            
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