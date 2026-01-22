import React from 'react'
import DataTable from '../components/DataTable'

const columnas = [
  { key: '_id', encabezado: '#' },
  { key: 'nombre', encabezado: 'NOMBRE' },
  { key: 'apellidos', encabezado: 'APELLIDOS' },
  { key: 'direccion', encabezado: 'DIRECCIÓN' },
  { key: 'telefono', encabezado: 'TELÉFONO' },
  { key: 'email', encabezado: '@' },
]

const datos = [
  {
    _id: 1,
    nombre: 'María',
    apellidos: 'Sarmiento',
    direccion: 'C/ Falsa, 11',
    telefono: '611 555 777',
    email: 'sarmientos@gmail.com',
  },
]

const ListUsers = () => {
  return (
    <div>
      <h1>Usuarios</h1>
      <hr />
      <DataTable datos={datos} columnas={columnas} />
    </div>
  )
}

export default ListUsers
