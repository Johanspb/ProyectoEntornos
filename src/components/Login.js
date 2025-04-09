// src/components/Login.js
import React, { useState } from 'react';
import { getUsuarios } from '../services/api'; // Para obtener la lista de usuarios
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => { // Asegúrate de recibir setUser como prop
  const [cedula, setCedula] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook para navegar

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Obtener la lista de usuarios del backend
      const response = await getUsuarios();
      const usuarios = response.data;

      // Buscar el usuario con la cédula proporcionada
      const usuario = usuarios.find((user) => user.cedula === cedula);

      // Verificar si el usuario existe y la contraseña es correcta
      if (usuario && usuario.contrasena === contrasena) {
        // Guardar la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(usuario));

        // Actualizar el estado del usuario en la aplicación
        setUser(usuario);

        // Mostrar mensaje de sesión iniciada correctamente
        setSuccessMessage('¡Sesión iniciada correctamente!');

        // Redirigir a la página correspondiente
        if (usuario.roles.some((rol) => rol.rol.rol === 'Administrador')) {
          navigate('/usuarios'); // Admin redirige a la página de usuarios
        } else if (usuario.roles.some((rol) => rol.rol.rol === 'Vendedor')) {
          navigate('/articulos'); // Vendedor redirige a la página de artículos
        }
        else{
          navigate('/'); // Redirigir a la página principal si no tiene rol específico
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      setError('Error en la autenticación');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} {/* Mensaje de éxito */}
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mensaje de error */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
