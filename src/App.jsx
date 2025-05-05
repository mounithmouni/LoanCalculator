import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import About from "./pages/About";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";

export default function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/exchange" element={<ExchangeRates />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
