import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import getExchangeRate from "../api/apiClient";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencyType, setCurrency] = useState("USD");
  const [currentExchange, setCurrentExchange] = useState(1);

  const fetchData = async (val) => {
    try {
      await getExchangeRate()
        .then((value) => {
          debugger;
          if (value && value.data && value.data.conversion_rates) {
            const data = value.data.conversion_rates[val];
            setCurrentExchange(data || 1);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setCurrentExchange(1);
    }
  };

  const handleChange = (event) => {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    fetchData(newCurrency);
  };

  const handleReset = () => {
    setCurrency("USD");
    setCurrentExchange(1);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currencyType,
        currentExchange,
        handleChange,
        handleReset,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
