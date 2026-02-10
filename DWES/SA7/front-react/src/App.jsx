import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import IndexComentarios from './views/Comments/Index'
import IndexUsers from './views/Users/Index'
import Login from './views/Users/Login'
import NewComentario from './views/Comments/New'
import ShowComentario from './views/Comments/Show'
import useCategoriaStore from './stores/categoriaStore'
import { useEffect } from 'react'

function App() {
  //Javascript
  //HOOKs
  const cargarCategorias = useCategoriaStore(state => state.cargarCategorias)

  useEffect(() => {
    cargarCategorias() //cargar categorias de forma global
  }, [])

  //HTML "tuneado"
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<IndexUsers />} />
        <Route path="/comentarios" element={<IndexComentarios />} />
        <Route path="/comentarios/new" element={<NewComentario />} />
        <Route path="/comentarios/:id" element={<ShowComentario />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
