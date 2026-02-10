import React from 'react'

const GenericForm = ({
  data,
  fields,
  onChange,
  onBack,
  onSave,
  isEditing,
  onEdit,
}) => {
  const handleSubmit = e => {
    e.preventDefault() //evitamos refresco
    onSave()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map(field => {
          const {
            key,
            label,
            type = 'text',
            options = [],
            optionValue = '',
            optionLabel = '',
          } = field

          return (
            <div key={key}>
              <label>{label}</label>
              {type === 'select' ? (
                <select
                  onChange={e => onChange(key, e.target.value)}
                  required
                  disabled={!isEditing}
                  value={data[key] ? data[key][optionValue] : ''}
                >
                  <option>--Selecciona--</option>
                  {options.map(opt => (
                    <option key={opt[optionValue]} value={opt[optionValue]}>
                      {opt[optionLabel]}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  value={data[key] || ''}
                  onChange={e => onChange(key, e.target.value)}
                  required
                  readOnly={!isEditing}
                />
              )}
            </div>
          )
        })}
        {isEditing && <button>Guardar</button>}
        {!isEditing && <button onClick={onEdit}>Editar</button>}
      </form>
      <button onClick={onBack}>Volver</button>
    </div>
  )
}

export default GenericForm
