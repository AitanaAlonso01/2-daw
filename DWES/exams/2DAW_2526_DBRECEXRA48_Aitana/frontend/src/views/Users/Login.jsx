import React, { useState } from 'react'
import { sendRequest } from "../../utils/functions"
import useUserStore from "../../stores/useStore"
import { useNavigate, Link } from 'react-router-dom'
import { showConfirm, showAlert } from '../../utils/functions'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const setUser = useUserStore(state => state.setUser)
  const navigate = useNavigate()

  const handleLogin = async () => {
    const res = await sendRequest(
      "POST",
      "/users/login",
      { username, password }
    )

    if(res.success){
      setUser({
        username: res.data.user.username,
        profile: res.data.user.profile
      })
      //showAlert("Login correcto")
      navigate("/usuarios")
    } else {
      showAlert(res.message)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control"
            placeholder="Username..."
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control"
            placeholder="Password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button 
          className="btn btn-primary w-100 mb-3"
          onClick={handleLogin}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i> Entrar
        </button>

        <hr />

        <Link className="btn btn-outline-secondary w-100" to="/comentarios">
          <i className="bi bi-chat-dots me-2"></i> Ir a Comentarios
        </Link>
      </div>
    </div>
  )
}

export default Login