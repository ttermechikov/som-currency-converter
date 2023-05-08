'use client';

import useSomCurrencyExchange from '@/hooks/use-som-currency-exchange';
import { useState } from 'react';

type SomCurrencyExchangeProps = {
  exchangeRatesXml: string;
};

export default function SomCurrencyExchange({ exchangeRatesXml }: SomCurrencyExchangeProps) {
  const [currencyToExchange, setCurrencyToExhange] = useState('');
  const { result, errorMessage, instructionsForUse } = useSomCurrencyExchange({
    currencyToExchange,
    exchangeRatesXml,
  });

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow dark:border mb-4 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="currency-to-exchange"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></label>
              <input
                type="text"
                id="currency-to-exchange"
                value={currencyToExchange}
                onChange={(e) => setCurrencyToExhange(e.target.value)}
                placeholder="Введите ваш запрос"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                autoFocus={true}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-gray-900 dark:text-white p-6 space-y-4 md:space-y-6 sm:p-8">
          <pre className="whitespace-pre-wrap break-all">
            {!result && !errorMessage ? instructionsForUse : result || errorMessage}
          </pre>
        </div>
      </div>
    </>
  );
}
