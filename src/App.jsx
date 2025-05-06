import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Body from "./components/Body";
import About from "./pages/About";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";
import { CurrencyProvider } from "./components/CurrencyContext";
import Error from "./pages/Error";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CurrencyProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route
                path="/"
                element={<Body darkMode={darkMode} toggleTheme={toggleTheme} />}
              >
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="exchange" element={<ExchangeRates />} />
                <Route path="contact" element={<Error />} />
                <Route path="*" element={<Error />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CurrencyProvider>
      </ThemeProvider>
    </>
  );
}
