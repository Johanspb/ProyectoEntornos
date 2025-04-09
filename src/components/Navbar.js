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
    <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        <li style={{ margin: '0 10px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>

        {!user && (
          <li style={{ margin: '0 10px' }}>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
          </li>
        )}

        {user && (
          <>
            <li style={{ margin: '0 10px' }}>
              <Link to="/usuarios" style={{ color: '#fff', textDecoration: 'none' }}>Usuarios</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/articulos" style={{ color: '#fff', textDecoration: 'none' }}>Articulos</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/unidades" style={{ color: '#fff', textDecoration: 'none' }}>Unidades</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/pedidos" style={{ color: '#fff', textDecoration: 'none' }}>Pedidos</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <button onClick={handleLogout} style={{ color: '#fff', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
