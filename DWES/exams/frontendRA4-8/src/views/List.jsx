import React from 'react'

function List({ users }) {
  return (
    <div className="list-container">
      <h2>Usuarios Registrados</h2>
      {users.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody className="table-dark">
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default List
