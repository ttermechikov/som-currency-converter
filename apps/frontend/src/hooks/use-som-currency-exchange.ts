import { useState, useEffect } from 'react';
import {
  SomCurrencyConverter,
  formatConvertedCurrencyResult,
  instructionsForUse,
  type TCurrencyConvertSuccess,
  type TCurrencyConvertError,
} from '@ttermechikov/som-currency-converter-core';

type TUseSomCurrencyExhchange = {
  exchangeRatesXml: string;
  currencyToExchange: string;
};

export default function useSomCurrencyExhchange({
  exchangeRatesXml,
  currencyToExchange,
}: TUseSomCurrencyExhchange) {
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setResult('');
    setErrorMessage('');

    if (!currencyToExchange.length) {
      return;
    }

    const somCurrencyConverter = new SomCurrencyConverter();
    somCurrencyConverter
      .convert(currencyToExchange, exchangeRatesXml)
      .then((converted: TCurrencyConvertSuccess | TCurrencyConvertError) => {
        if (converted.success) {
          const result = formatConvertedCurrencyResult(converted);
          setResult(result);
        } else {
          setErrorMessage(converted.errorMessage);
        }
      });
  }, [currencyToExchange, exchangeRatesXml]);

  return {
    result,
    errorMessage,
    instructionsForUse,
  };
}
