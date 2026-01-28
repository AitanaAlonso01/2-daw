import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Index = () => {
  const [comentarios, setComentarios] = useState([]) // Hook - Array vacio

  // Javascript
  const getComentarios = async () => {
    try {
      const response = await axios.get('/comments')
      console.log(response.data)
      setComentarios(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Hooks
  useEffect(() => {
    getComentarios()
  }, []) // Ejecuta una única vez [], cuando se renderiza el componente

  return (
    <div>
      <h1>Listado de Comentarios</h1>
      <table border="1px">
        <thead>
          <tr>
            <th>#</th>
            <th>USUARIO</th>
            <th>OPINIÓN</th>
            <th>CATEGORÍA</th>
            <th>VALORACIÓN</th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map(c => (
            <tr key={c._id}>
              <td>{c._id}</td>
              <td>{c.usuario}</td>
              <td>{c.opinion}</td>
              <td>{c.categoria.nombre}</td>
              <td>{c.valoracion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index
