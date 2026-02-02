import React, { use, useState, useEffect } from 'react'
import GenericForm from '../../components/GenericForm'
import { useNavigate, useParams } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'

const Show = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({})

  const getComentario = async () => {
    /*try {
          const response = await axios.get("/comments")
          console.log(response.data)
          setComentarios(response.data)
        } catch (error) {
          console.log(error)
        }*/
    const res = await sendRequest('GET', '/comments/' + id)
    if (res.success) {
      setData(res.data)
    } else {
      alert(res.message)
    }
  }

  const fields = [
    { key: 'usuario', label: 'Usuario:' },
    { key: 'opinion', label: 'Opinión:' },
    { key: 'categoria', label: 'Categoría:' },
    { key: 'valoracion', label: 'Valoración:' },
  ]

  //Actualizar los campos en estado local
  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    // console.log(data)
    const res = await sendRequest('POST', '/comments', data)
    if (res.success) {
      alert('Comentario creado exitosamente')
      navigate('/comentarios')
    } else {
      alert(res.message)
    }
  }

  useEffect(() => {
    getComentario()
  }, []) //Ejecuta, una única vez [], cuando se renderiza el componente

  return (
    <div>
      <h1>Detalles Comentario</h1>
      <h5>({id})</h5>
      <GenericForm
        data={data}
        fields={fields}
        onChange={handleChange}
        onBack={() => navigate('/comentarios')}
        onSave={handleSave}
        isEditing={false}
      />
    </div>
  )
}

export default Show
