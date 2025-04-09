// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  // Asegúrate de que LoginPage sea el correcto
import UsuarioPage from './pages/UsuarioPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ArticuloCRUD from './components/ArticuloCRUD';
import PedidoCRUD from './components/PedidoCRUD';
import UnidadCRUD from './components/UnidadCRUD';

const App = () => {
  const [user, setUser] = useState(null);

  // Recuperar el usuario desde localStorage cuando la aplicación se monta
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  // Ruta protegida: Verifica si el usuario tiene el rol adecuado
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    const hasPermission = user.roles.some(role => roles.includes(role.rol.rol));
    if (!hasPermission) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} /> {/* Navbar siempre visible */}
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage setUser={setUser} />} /> {/* Asegúrate de pasar setUser */}

        {/* Home - Página principal */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute roles={['Administrador']}>
              <UsuarioPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/articulos" 
          element={
            <ProtectedRoute roles={['Administrador', 'Vendedor']}>
              <ArticuloCRUD />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/pedidos" 
          element={
            <ProtectedRoute roles={['Administrador', 'Vendedor']}>
              <PedidoCRUD />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/unidades" 
          element={
            <ProtectedRoute roles={['Administrador', 'Vendedor']}>
              <UnidadCRUD />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
