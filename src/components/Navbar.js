// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el usuario de localStorage
    localStorage.removeItem('user');
    // Limpiar el estado de user en la aplicación
    setUser(null);
    // Redirigir al login
    navigate('/login');
  };

  return (
    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand app-logo" to="/">Zelev</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">Home</Link>

            {!user && (
              <Link className="nav-link" to="/login">Login</Link>
            )}

            {user && (
              <>
                <Link className="nav-link" to="/usuarios">Usuarios</Link>
                <Link className="nav-link" to="/articulos">Artículos</Link>
                <Link className="nav-link" to="/unidades">Unidades</Link>
                <Link className="nav-link" to="/pedidos">Pedidos</Link>
              </>
            )}
          </div>

          {user && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
