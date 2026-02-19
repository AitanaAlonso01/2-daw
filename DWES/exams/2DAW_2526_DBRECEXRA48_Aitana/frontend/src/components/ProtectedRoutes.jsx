import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/useStore";

const ProtectedRoutes = ({ allowedRoles }) => {
  const user = useUserStore(state => state.user);
  const loadingUser = useUserStore(state => state.loadingUser);

  // ⛔ MUY IMPORTANTE: NO REDIRIGIR mientras estamos cargando
  if (loadingUser) {
    return <div>Cargando sesión...</div>;
  }

  console.log("ProtectedRoutes - user:", user);

  // Mientras user sea undefined (estado inicial), no renderizamos nada
  if (user === undefined) return null;

  // Si no hay usuario en el store → redirigir a login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si hay roles permitidos y el usuario NO está entre ellos → fuera
  if (allowedRoles && !allowedRoles.includes(user.profile)) {
    return <Navigate to="/comentarios" />; // redirigimos a zona "pública"
  }

  return <Outlet />;
};

export default ProtectedRoutes;