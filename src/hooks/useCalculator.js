import { useState } from 'react';

export function useCalculator() {
  const [displayValue, setDisplayValue] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);
  const [lastOperator, setLastOperator] = useState('');
  const [hiddenResult, setHiddenResult] = useState('');

  const handleNumber = (value) => {
    if (displayValue === '0' || hasCalculated) {
      setDisplayValue(value);
      setHasCalculated(false);
    } else {
      setDisplayValue(prev => prev + value);
    }
    
    if (hiddenResult) {
      setHiddenResult('');
    }
  };

  const handleOperator = (value) => {
    setHasCalculated(false);
    
    if (displayValue === '' && !['(', ')'].includes(value)) {
      return;
    }
    
    const lastChar = displayValue.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar) && !['(', ')'].includes(value)) {
      setDisplayValue(prev => prev.slice(0, -1) + value);
      return;
    }
    
    setDisplayValue(prev => prev + value);
    setLastOperator(value);
    
    if (hiddenResult) {
      setHiddenResult('');
    }
  };

  const handleDecimal = () => {
    if (hasCalculated) {
      setDisplayValue('0.');
      setHasCalculated(false);
      return;
    }
    
    const expressionParts = displayValue.split(/[+\-*/()]/g);
    const lastNumber = expressionParts[expressionParts.length - 1];
    
    if (!lastNumber || !lastNumber.includes('.')) {
      if (displayValue === '' || /[+\-*/()]/.test(displayValue.slice(-1))) {
        setDisplayValue(prev => prev + '0.');
      } else {
        setDisplayValue(prev => prev + '.');
      }
    }
    
    if (hiddenResult) {
      setHiddenResult('');
    }
  };

  const handleClear = () => {
    setDisplayValue('');
    setHiddenResult('');
    setHasCalculated(false);
    setLastOperator('');
  };

  const handleCalculate = () => {
    if (displayValue === '') {
      setDisplayValue('Error');
      setHiddenResult('Error');
      return;
    }
    
    try {
      let expression = displayValue
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');
        
      // eslint-disable-next-line
      const result = new Function('return ' + expression)();
      
      if (Number.isFinite(result)) {
        const formattedResult = Number.isInteger(result) ? 
          result.toString() : 
          parseFloat(result.toFixed(10)).toString();
        
        setDisplayValue(formattedResult);
        setHiddenResult(formattedResult);
        setHasCalculated(true);
      } else if (result === Infinity || result === -Infinity) {
        setDisplayValue('Infinity');
        setHiddenResult('Infinity');
        setHasCalculated(true);
      } else if (isNaN(result)) {
        setDisplayValue('NaN');
        setHiddenResult('NaN');
        setHasCalculated(true);
      } else {
        setDisplayValue('Error');
        setHiddenResult('Error');
        setHasCalculated(true);
      }
    } catch (error) {
      setDisplayValue('Error');
      setHiddenResult('Error');
      setHasCalculated(true);
    }
  };

  return {
    displayValue,
    calculationResult: hiddenResult,
    handleNumber,
    handleOperator,
    handleDecimal,
    handleClear,
    handleCalculate,
  };
}