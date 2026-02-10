import React from 'react'

const GenericForm = ({ data, fields, onChange, onBack, onSave, isEditing }) => {
  const handleSubmit = e => {
    e.preventDefault() //evitar que se refresque el formulario
    onSave()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label>{label}</label>
            <input
              type="text"
              value={data[key] || ''}
              onChange={e => onChange(key, e.target.value)}
              required
              readOnly={!isEditing}
            />
          </div>
        ))}
        {isEditing && <button>Guardar</button>}
      </form>
      <button onClick={onBack}>Volver</button>
    </div>
  )
}

export default GenericForm
