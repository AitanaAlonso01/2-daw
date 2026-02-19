import React, { useState } from 'react'
import GenericForm from '../../components/GenericForm'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'
import useCategoriaStore from '../../stores/categoriaStore'
import { showConfirm, showAlert } from '../../utils/functions'

const New = () => {
  const navigate = useNavigate()

  const categorias = useCategoriaStore(state => state.categorias)

  //Plantilla inicial de comentarios
  const [data, setData] = useState({
    usuario: '',
    opinion: '',
    categoria: '', // aquí guardaremos el _id de la categoría
    valoracion: '',
  })

  const fields = [
    { key: 'usuario', label: 'Usuario:', type: 'text' },
    { key: 'opinion', label: 'Opinión:', type: 'text' },
    {
      key: 'categoria',
      label: 'Categoría:',
      type: 'select',
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
    const res = await sendRequest('POST', '/comments', data)
    if (res.success) {
      navigate('/comentarios')
    } else {
      showAlert(res.message)
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
        isEditing={true} // siempre editable en New
      />
    </div>
  )
}

export default New
