import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import IndexComentarios from './views/Comments/Index'
import IndexUsers from './views/Users/Index'
import Login from './views/Users/Login'
import NewComentario from './views/Comments/New'
import ShowComentario from "./views/Comments/Show"

import Layout from "./components/Layout"
import useCategoriaStore from "./stores/categoriaStore";
import useUserStore from "./stores/useStore";

import IndexDummy from "./views/Dummy/Index";


import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const cargarCategorias = useCategoriaStore(state => state.cargarCategorias);
  const cargarUsuarioLogueado = useUserStore(state => state.cargarUsuarioLogueado);

  useEffect(() => {
    cargarCategorias();
    cargarUsuarioLogueado();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: login */}
        <Route path="/" element={<Login />} />

        {/* ---- COMENTARIOS: CON LAYOUT PERO SIN PROTEGER ---- */}
        <Route element={<Layout />}>
          <Route path="/comentarios" element={<IndexComentarios />} />
          <Route path="/comentarios/new" element={<NewComentario />} />
          <Route path="/comentarios/:id" element={<ShowComentario />} />
        </Route>

        {/* ---- USUARIOS: LAYOUT + PROTEGIDO (USER y ADMIN) ---- */}
        <Route element={<ProtectedRoutes allowedRoles={["USER","ADMIN"]} />}>
          <Route element={<Layout />}>
            <Route path="/usuarios" element={<IndexUsers />} />
          </Route>
        </Route>

        {/* ---- DUMMY: LAYOUT + SOLO ADMIN ---- */}
        <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
          <Route element={<Layout />}>
            <Route path="/dummy" element={<IndexDummy />} />
          </Route>
        </Route>


        {/* Catch-all */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App