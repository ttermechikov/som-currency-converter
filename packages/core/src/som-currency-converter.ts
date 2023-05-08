import axios from 'axios';
import { xml2js, type ElementCompact } from 'xml-js';
import { formatCurrencyAmount, isEmptyString, isNaNValue, notDigitsRegExp } from './utils';
import type {
  TCurrency,
  TCurrenciesMap,
  TExchangeRates,
  TExchangeRatesResponse,
  TParsedUserInput,
  TUserInput,
  TConvertedResponse,
  TCurrencyConvertSuccess,
  TCurrencyConvertError,
} from './types';

export enum ConverterErrors {
  PARSE_ERROR = 'Некорректный запрос',
  EXCHANGE_RATES_FETCH_ERROR = 'Ошибка при получении данных с НБКР. Попробуйте еще раз!',
  EMPTY_REQUEST = 'Пустой запрос',
}

export class SomCurrencyConverter {
  #EXCHANGE_RATES_URL = 'https://www.nbkr.kg/XML/daily.xml';

  #CURRENCIES_MAP: TCurrenciesMap = {
    KGS: ['с', 'сом', 'сома', 'сомы'],
    USD: ['$', 'д', 'доллар', 'доллара', 'долларов', 'доллары'],
    EUR: ['€', 'евро'],
    KZT: ['т', 'тенге'],
    RUB: ['₽', 'р', 'руб', 'рубль', 'рубля', 'рублей', 'рубли'],
  };

  async convert(
    userInput: TUserInput,
    defaultExchangeRatesXml?: string,
  ): Promise<TCurrencyConvertSuccess | TCurrencyConvertError> {
    try {
      if (isEmptyString(userInput)) {
        throw new Error(ConverterErrors.EMPTY_REQUEST);
      }

      let { amount, currencyName }: TParsedUserInput = this.parseUserInput(userInput);
      const exchangeRates = await this.getExchangeRates(defaultExchangeRatesXml);
      const result: TConvertedResponse = {};

      if (currencyName !== 'KGS') {
        amount *= exchangeRates[currencyName];
        result['KGS'] = formatCurrencyAmount({
          amount,
          currency: 'KGS',
        });
      }

      for (let [currency, value] of Object.entries(exchangeRates)) {
        if (currency === currencyName) continue;

        const total = +(amount / value);
        result[currency] = formatCurrencyAmount({
          amount: total,
          currency,
        });
      }

      return {
        success: true,
        result,
      };
    } catch (e: unknown) {
      let errorMessage = 'ConvertError';

      if (e instanceof Error) {
        errorMessage = e.message;
      }
      if (typeof e === 'string') {
        errorMessage = e;
      }

      return {
        success: false,
        errorMessage,
      };
    }
  }

  private async getExchangeRates(defaultExchangeRates?: TExchangeRatesResponse) {
    let exchangeRates;

    if (defaultExchangeRates) {
      exchangeRates = this.buildExchangeRatesObject(defaultExchangeRates);
    } else {
      exchangeRates = await this.fetchExchangeRates();
    }

    return exchangeRates;
  }

  private parseUserInput(userInput: TUserInput): TParsedUserInput {
    userInput = userInput.replaceAll(' ', '').replace(',', '.');

    const amount = parseFloat(userInput);
    if (isNaNValue(amount)) {
      throw new Error(ConverterErrors.PARSE_ERROR);
    }

    const maybeCurrency = userInput.replace(String(amount), '').match(notDigitsRegExp)?.[0];
    if (!maybeCurrency) {
      throw new Error(ConverterErrors.PARSE_ERROR);
    }

    const currencyName = this.getCurrencyName(maybeCurrency.toLowerCase());
    if (!currencyName) {
      throw new Error(ConverterErrors.PARSE_ERROR);
    }

    return {
      amount,
      currencyName,
    };
  }

  private async fetchExchangeRates(): Promise<TExchangeRates> {
    try {
      const res = await axios.get(this.#EXCHANGE_RATES_URL);

      if (res.status !== 200) {
        throw new Error(ConverterErrors.EXCHANGE_RATES_FETCH_ERROR);
      }

      return this.buildExchangeRatesObject(res.data);
    } catch (e) {
      throw new Error(ConverterErrors.EXCHANGE_RATES_FETCH_ERROR);
    }
  }

  private buildExchangeRatesObject(exchangeRatesXML: TExchangeRatesResponse): TExchangeRates {
    const parsingOptions = { compact: true, indentAttributes: true };
    const parsed = xml2js(exchangeRatesXML, parsingOptions) as ElementCompact;
    const exchangeRates = {} as TExchangeRates;

    parsed.CurrencyRates.Currency.forEach((currencyNode: ElementCompact) => {
      const currencyName = String(currencyNode?._attributes?.ISOCode) as TCurrency;
      const value = currencyNode?.Value?._text;

      exchangeRates[currencyName] = parseFloat(value.replace(',', '.'));
    });

    return exchangeRates;
  }

  private getCurrencyName(maybeCurrency: string): TCurrency | null {
    for (let [name, values] of Object.entries(this.#CURRENCIES_MAP)) {
      if (values.includes(maybeCurrency)) {
        return name as TCurrency;
      }
    }

    return null;
  }
}
