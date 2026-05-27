import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      {/* Mostrar NavBar solo si NO estamos en login */}
      {location.pathname !== "/" && <NavBar />}

      <main style={{ padding: "20px" }}>
        <Outlet />  {/* <- Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  )
}

export default Layout;