import type { TCurrencyConvertSuccess, TCurrency } from './types';
import { countryFlagsMap } from './constants';

export const notDigitsRegExp = /\D+/g;

export const isEmptyString = (str: string) => !str || str.trim().length === 0;

export const isNaNValue = (numeric: number) => Number.isNaN(numeric);

export const formatCurrencyAmount = (currencyAmount: { currency: string; amount: number }) =>
  currencyAmount.amount.toLocaleString('ru-RU', {
    style: 'currency',
    currency: currencyAmount.currency,
  });

export const formatConvertedCurrencyResult = (convertedCurrencyResult: TCurrencyConvertSuccess) => {
  let formatted = '';

  for (let [key, value] of Object.entries(convertedCurrencyResult.result)) {
    formatted += `${countryFlagsMap[key as TCurrency]} ${value}\n`;
  }

  return formatted;
};
