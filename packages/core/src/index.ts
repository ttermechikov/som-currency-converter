export { SomCurrencyConverter } from './som-currency-converter';
export * from './types';
export * from './constants';
export { formatCurrencyAmount, formatConvertedCurrencyResult } from './utils';

/**
 * DEV
 */

// import { SomCurrencyConverter } from './som-currency-converter';

// const somCurrencyConverter = new SomCurrencyConverter();

// const values = [
//   '11987 сом',
//   '700$',
//   'евро 500',
//   '5000    тенге',
//   '1200 евро',
//   '',
//   '   ',
//   '2200 долларов',
// ];

// for (let value of values) {
//   (async () => {
//     try {
//       const result = await somCurrencyConverter.convert(value);
//       console.log(result);
//     } catch (e) {
//       console.log(e);
//     }
//   })();
// }
