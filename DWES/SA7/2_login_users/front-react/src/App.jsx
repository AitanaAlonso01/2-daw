import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import IndexComentarios from './views/Comments/Index'
import IndexUsers from './views/Users/Index'
import Login from './views/Users/Login'
import NewComent from './views/Comments/New'
import ShowComent from './views/Comments/Show'

function App() {
  //Javascript
  //HOOKs

  //HTML "tuneado"
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<IndexUsers />} />
        <Route path="/comentarios" element={<IndexComentarios />} />
        <Route path="/comentarios/new" element={<NewComent />} />
        <Route path="/comentarios/:id" element={<ShowComent />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
