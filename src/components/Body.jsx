import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

export default function Body() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
