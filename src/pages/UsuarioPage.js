// src/pages/UsuarioPage.js
import React from 'react';
import UsuarioCRUD from '../components/UsuarioCRUD';

const UsuarioPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Gestión de Usuarios</h1>
      <UsuarioCRUD />
    </div>
  );
};

export default UsuarioPage;
