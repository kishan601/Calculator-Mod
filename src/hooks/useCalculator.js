import { useState, useCallback } from 'react';

export function useCalculator() {
  const [displayValue, setDisplayValue] = useState('');
  const [calculationResult, setCalculationResult] = useState('');
  const [hasError, setHasError] = useState(false); // Add this line to track errors

  const handleNumber = useCallback((number) => {
    setHasError(false); // Clear error state when user enters new numbers
    setDisplayValue((prev) => prev + number);
  }, []);

  const handleOperator = useCallback((operator) => {
    setHasError(false); // Clear error state when user enters new operators
    setDisplayValue((prev) => prev + operator);
  }, []);

  const handleDecimal = useCallback(() => {
    setHasError(false); // Clear error state when user enters decimal
    setDisplayValue((prev) => {
      // Logic to prevent multiple decimals in a number
      const parts = prev.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      
      if (lastPart.includes('.')) {
        return prev;
      }
      return prev + '.';
    });
  }, []);

  const handleClear = useCallback(() => {
    setDisplayValue('');
    setCalculationResult('');
    setHasError(false); // Clear error state when calculator is cleared
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      if (!displayValue) {
        setCalculationResult('Error');
        setHasError(true); // Set error state for empty calculation
        return;
      }

      // Safety check for eval
      if (!/^[0-9+\-*/(). ]*$/.test(displayValue)) {
        setCalculationResult('Error');
        setHasError(true); // Set error state for invalid characters
        return;
      }

      // eslint-disable-next-line no-eval
      const result = eval(displayValue);
      
      if (result === Infinity || result === -Infinity) {
        setCalculationResult('Infinity');
        setHasError(true); // Set error state for division by zero
      } else if (isNaN(result)) {
        setCalculationResult('NaN');
        setHasError(true); // Set error state for NaN
      } else {
        setCalculationResult(String(result));
        setHasError(false);
      }
    } catch (error) {
      setCalculationResult('Error');
      setHasError(true); // Set error state for any other errors
    }
  }, [displayValue]);

  return {
    displayValue,
    calculationResult,
    hasError, // Export the error state
    handleNumber,
    handleOperator,
    handleDecimal,
    handleClear,
    handleCalculate,
  };
}