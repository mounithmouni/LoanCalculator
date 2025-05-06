import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import About from "./pages/About";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";
import { CurrencyProvider } from "./components/CurrencyContext";
import Error from "./pages/Error";

export default function App() {
  return (
    <>
      <CurrencyProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="exchange" element={<ExchangeRates />} />
              <Route path="contact" element={<Error />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </>
  );
}
