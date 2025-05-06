import React, { useContext } from "react";
import { CurrencyContext } from "../components/CurrencyContext";
import ConversionRates from "../components/ConversionRates";

export default function ExchangeRates() {
  const { currency, conversion_rates } = useContext(CurrencyContext);

  return conversion_rates.length !== 0 ? (
    <div className="mt-20 mx-50">
      <h1 className="mt-26">Live Exchange Rates {`(Base: ${currency})`}</h1>
      <ConversionRates
        conversion_rates={conversion_rates}
        currency={currency}
      />
    </div>
  ) : (
    <p className="mt-66 flex justify-center text-2xl uppercase text-red-500">
      No Live Updates
    </p>
  );
}
