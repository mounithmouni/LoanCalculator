import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

export default function Body({ darkMode, toggleTheme }) {
  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main style={{ marginTop: "64px", padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}
