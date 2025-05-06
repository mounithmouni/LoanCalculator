import React, { useContext } from "react";
import { CurrencyContext } from "../components/CurrencyContext";
import ConversionRatesTable from "../components/ConversionRatesTable";

export default function ExchangeRates() {
  const { currencyType } = useContext(CurrencyContext);

  return (
    <div className="sm:mt-10 sm:mx-50">
      <h1 className="text-xl mt-10 ml-2 sm:mt-12 sm:ml-0 sm:text-3xl">
        Live Exchange Rates {`(Base: ${currencyType})`}
      </h1>
      <ConversionRatesTable currencyType={currencyType} />
    </div>
  );
}
