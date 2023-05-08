import SomCurrencyExchange from './som-currency-exchange';

export default async function Home() {
  const exchangeRatesXml = await fetch('https://www.nbkr.kg/XML/daily.xml')
    .then((res) => res.text())
    .catch((e) => console.log('Fetch error', e));

  return (
    <div className="flex flex-col items-center px-6 mx-auto md:h-screen lg:py-0">
      <h1 className="mb-4 pt-8 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Конвертер валют
      </h1>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        По курсу НБКР
      </p>
      {exchangeRatesXml ? (
        <SomCurrencyExchange exchangeRatesXml={exchangeRatesXml} />
      ) : (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Ошибка при получении данных с сайта НБКР.</span> <br />
          Попробуйте перезагрузить страницу или зайти немного позднее.
        </div>
      )}
    </div>
  );
}
