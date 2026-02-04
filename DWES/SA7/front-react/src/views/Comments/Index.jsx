import React, { useEffect,useState } from 'react'
import axios from "axios"
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const Index = () => {

  const [comentarios,setComentarios] = useState([]) //HOOK

  const navigate = useNavigate()

  //Javascript
  const getComentarios = async() => {
      /*try {
        const response = await axios.get("/comments")  
        console.log(response.data)
        setComentarios(response.data)
      } catch (error) {
        console.log(error)
      }*/
     const res = await sendRequest("GET","/comments")
     if(res.success){
        setComentarios(res.data) 
     } else {
        alert(res.message)
     }
  }

  useEffect(()=>{
    getComentarios()
  },[]) //Ejecuta, una única vez [], cuando se renderiza el componente


  return (
    <div>
        <h1>Listado de Comentarios</h1>
        <button 
          onClick={()=>navigate("/comentarios/new")}>Nuevo Comentario
        </button>
        <table border="1px">
          <thead>            
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>OPINION</th>
              <th>CATEGORIA</th>
              <th>VALORACION</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {
              comentarios.map((c) => 
                <tr key={c._id}>
                  <td>{c._id}</td>
                  <td>{c.usuario}</td>
                  <td>{c.opinion}</td>
                  <td>{c.categoria.nombre}</td>
                  <td>{c.valoracion}</td>
                  <td>
                    <button onClick={()=>navigate("/comentarios/" + c._id)}>Ver</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
    </div>    
  )
}

export default Index