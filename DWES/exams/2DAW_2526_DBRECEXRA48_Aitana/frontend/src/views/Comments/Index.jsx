//TO DO - Listado de Comentarios
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListComments = () => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3010/api/v1/comments')
      .then(res => setComments(res.data))
      .catch(err => console.error('Error al cargar comentarios', err))
  }, [])

  return (
    <>
      <div className="container mt-4">
        <h2>Listado de Comentarios</h2>
        <Link to={'/'}>Volver</Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Opinión</th>
              <th>Categoria</th>
              <th>Valoración</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment._id}>
                <td>{comment._id}</td>
                <td>{comment.usuario}</td>
                <td>{comment.opinion}</td>
                <td>{comment.categoria.nombre}</td>
                <td>{comment.valoracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListComments
