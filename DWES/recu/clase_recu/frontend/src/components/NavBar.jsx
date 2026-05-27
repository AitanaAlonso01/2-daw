import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useStore";
import { sendRequest } from "../utils/functions";

const NavBar = () => {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await sendRequest("POST", "/users/logout");
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand">Mi App</span>

      <div className="collapse navbar-collapse">
        {user ? (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link text-light">
                <i className="bi bi-person-circle me-1"></i>
                Hola, {user.username} ({user.profile})
              </span>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">
                <i className="bi bi-people"></i> Usuarios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/comentarios">
                <i className="bi bi-chat-dots"></i> Comentarios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dummy">
                <i className="bi bi-speedometer2"></i> Panel Admin
              </Link>
            </li>
          </ul>
        ) : (
          <span className="text-light">No logueado</span>
        )}

        {user && (
          <button 
            className="btn btn-outline-light"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavBar;