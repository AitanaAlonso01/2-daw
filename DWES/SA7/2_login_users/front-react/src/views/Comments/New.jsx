import React, { useState } from 'react'
import GenericForm from '../../components/GenericForm'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'

const New = () => {
  const navigate = useNavigate()

  //Plantilla inicial de comenatrios
  const [data, setData] = useState({
    usuario: '',
    opinion: '',
    categoria: '',
    valoracion: '',
  })

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

  return (
    <div>
      <h1>Nuevo Comentario</h1>
      <GenericForm
        data={data}
        fields={fields}
        onChange={handleChange}
        onBack={() => navigate('/comentarios')}
        onSave={handleSave}
        isEditing={true}
      />
    </div>
  )
}

export default New
