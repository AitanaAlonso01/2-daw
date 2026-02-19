import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { showConfirm, showAlert } from '../../utils/functions'


const Index = () => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const res = await sendRequest("GET", "/users")
    if(res.success){
      setUsers(res.data) 
    } else {
      showAlert(res.message)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Listado de Usuarios</h1>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>USERNAME</th>
            <th>PERFIL</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.username}</td>
              <td>
                {u.profile === "ADMIN" && <span className="badge bg-danger">{u.profile}</span>}
                {u.profile === "USER" && <span className="badge bg-primary">{u.profile}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index