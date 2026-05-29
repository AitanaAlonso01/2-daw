import React from 'react'

const GenericForm = ({
  data,
  fields,
  onChange,
  onBack,
  onSave,
  isEditing,
  onEdit
}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        {fields.map((field) => {
          const {
            key,
            label,
            type = "text",
            options = [],
            optionValue = "_id",
            optionLabel = "nombre"
          } = field

          return (
            <div className="mb-3" key={key}>
              <label className="form-label">{label}</label>

              {type === "select" ? (
                <select
                  className="form-select"
                  value={
                    typeof data[key] === "object" && data[key] !== null
                      ? data[key][optionValue]
                      : data[key] || ""
                  }
                  onChange={e => onChange(key, e.target.value)}
                  disabled={!isEditing}
                  required
                >
                  <option value="">-- Selecciona --</option>

                  {options.map(opt => (
                    <option
                      key={opt[optionValue]}
                      value={opt[optionValue]}
                    >
                      {opt[optionLabel]}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="form-control"
                  type={type}
                  value={
                    typeof data[key] === "object" && data[key] !== null
                      ? data[key][optionLabel] || ""
                      : data[key] || ""
                  }
                  onChange={e => onChange(key, e.target.value)}
                  required
                  readOnly={!isEditing}
                />
              )}
            </div>
          )
        })}

        {isEditing && (
          <button className="btn btn-success me-2">
            <i className="bi bi-floppy"></i> Guardar
          </button>
        )}

        {!isEditing && (
          <button 
            type="button"
            className="btn btn-warning me-2"
            onClick={onEdit}
          >
            <i className="bi bi-pencil"></i> Editar
          </button>
        )}

        <button 
          type="button"
          className="btn btn-secondary"
          onClick={onBack}
        >
          <i className="bi bi-arrow-left"></i> Volver
        </button>

      </form>
    </div>
  )
}

export default GenericForm