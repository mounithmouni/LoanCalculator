import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);

  const fetchData = async (val) => {
    try {
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/4df3bade102da003b9e67388/latest/USD`
      );
      const data = res.data.conversion_rates[val];
      setConversionRate(data || 1);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setConversionRate(1);
    }
  };

  const handleChange = (event) => {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    fetchData(newCurrency);
  };

  const handleReset = () => {
    setCurrency("USD");
    setConversionRate(1);
  };

  //   useEffect(() => {
  //     fetchData(currency);
  //   }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{ currency, conversionRate, handleChange, handleReset }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
