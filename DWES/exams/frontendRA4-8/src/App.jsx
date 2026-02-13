import { useState, useEffect } from 'react'
import List from './views/List'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await fetch(
          'http://localhost:3010/api/v1/users/listado',
          {
            method: 'GET',
            credentials: 'include', // Clave para RA4/RA8
          }
        )

        if (response.ok) {
          const data = await response.json()
          setUsers(data)
          setError(null)
        } else {
          setError('Acceso denegado. ¿Has hecho login en el Backend?')
        }
      } catch (err) {
        setError('Error de conexión con el servidor: ' + err.message)
      }
    }

    getUsuarios()
  }, [])

  return (
    <div className="App">
      <header>
        <h1>Panel de Administración</h1>
        <p>RA8: Consumo de API desde React</p>
      </header>

      <main>
        {error ? (
          <div
            style={{ color: 'red', padding: '20px', border: '1px solid red' }}
          >
            {error}
            <br />
            <a href="http://localhost:3010/api/v1/users/login">
              Ir al Login del Backend
            </a>
          </div>
        ) : (
          <List users={users} />
        )}
      </main>
    </div>
  )
}

export default App
