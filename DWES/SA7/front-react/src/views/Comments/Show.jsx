import React, { useEffect, useState } from 'react'
import GenericForm from '../../components/GenericForm'
import { useNavigate, useParams } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'
import useCategoriaStore from '../../stores/categoriaStore'

const Show = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const categorias = useCategoriaStore(state => state.categorias)
  const [isEditing, setIsEditing] = useState(false)

  const getComentario = async () => {
    const res = await sendRequest('GET', '/comments/' + id)
    if (res.success) {
      setData(res.data)
    } else {
      alert(res.message)
    }
  }

  const fields = [
    { key: 'usuario', label: 'Usuario:', type: 'text' },
    { key: 'opinion', label: 'Opinión:', type: 'text' },
    {
      key: 'categoria',
      label: 'Categoría:',
      type: 'select',
      /*options: [
        { _id: 1, nombre: 'moda' },
        { _id: 2, nombre: 'deportes' },
      ],*/
      options: categorias,
      optionValue: '_id',
      optionLabel: 'nombre',
    },
    { key: 'valoracion', label: 'Valoración:', type: 'number' },
  ]

  //Actualizar campos en estado local
  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    //console.log(data)
    const res = await sendRequest('PATCH', '/comments/' + id, data)
    if (res.success) {
      navigate('/comentarios')
    } else {
      alert(res.message)
    }
  }

  useEffect(() => {
    getComentario()
  }, [])

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
        onEdit={() => setIsEditing(true)}
        isEditing={isEditing}
      />
    </div>
  )
}

export default Show
