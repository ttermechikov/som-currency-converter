export type TUserInput = string;

export type TConvertedResponse = Record<string, string>;

export type TCurrency = 'KGS' | 'USD' | 'EUR' | 'KZT' | 'RUB';

export type TParsedUserInput = {
  amount: number;
  currencyName: TCurrency;
};

export type TCurrencyConvertSuccess = {
  success: true;
  result: TConvertedResponse;
};

export type TCurrencyConvertError = {
  success: false;
  errorMessage: string;
};

export type CountryFlagsMap = Partial<{
  [K in TCurrency]: string;
}>;

export type TExchangeRatesResponse = string;

export type TExchangeRates = Record<TCurrency, number>;

export type TCurrenciesMap = Record<TCurrency, string[]>;
