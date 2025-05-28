// src/components/UsuarioCRUD.js
import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, deleteUsuarioF } from '../services/api'; // Asegúrate de que tienes estas funciones

const UsuarioCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  
  // Campos para crear o actualizar un usuario
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [estado, setEstado] = useState('ACTIVO'); // Valor por defecto es "ACTIVO"
  
  // Editar usuario
  const [editMode, setEditMode] = useState(false); // Indica si estamos editando un usuario o creando uno nuevo
  const [currentUser, setCurrentUser] = useState(null); // Usuario que estamos editando
  
  // Obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await getUsuarios();
      setUsuarios(response.data);
    };
    fetchUsuarios();
  }, []);

  // Manejo de la creación de un nuevo usuario
  const handleCreate = async () => {
    const nuevoUsuario = { 
      cedula, 
      nombres, 
      apellidos, 
      email, 
      telefono, 
      direccion, 
      contrasena, 
      fechaNacimiento, 
      estado 
    };

    try {
      await createUsuario(nuevoUsuario);
      // Limpiar los campos después de agregar el usuario
      clearForm();
      // Actualizar la lista de usuarios
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  // Manejo de la actualización de un usuario
  const handleUpdate = async () => {
    const updatedUser = {
      cedula,
      nombres,
      apellidos,
      email,
      telefono,
      direccion,
      contrasena,
      fechaNacimiento,
      estado
    };

    try {
      await updateUsuario(updatedUser); // Usamos la función para actualizar el usuario en el backend
      clearForm(); // Limpiar formulario
      setEditMode(false); // Salir del modo de edición
      const response = await getUsuarios(); // Obtener la lista de usuarios actualizada
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  // Manejo de la eliminación de un usuario
  const handleDelete = async (cedula) => {
    try {
      await deleteUsuario(cedula); // Eliminar el usuario en el backend
      const response = await getUsuarios(); // Actualizar la lista de usuarios
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Limpiar el formulario
  const clearForm = () => {
    setCedula('');
    setNombres('');
    setApellidos('');
    setEmail('');
    setTelefono('');
    setDireccion('');
    setContrasena('');
    setFechaNacimiento('');
    setEstado('ACTIVO');
  };

  // Manejo de la edición de un usuario
  const handleEdit = (usuario) => {
    setEditMode(true);
    setCurrentUser(usuario);
    setCedula(usuario.cedula);
    setNombres(usuario.nombres);
    setApellidos(usuario.apellidos);
    setEmail(usuario.email);
    setTelefono(usuario.telefono);
    setDireccion(usuario.direccion);
    setContrasena(usuario.contrasena);
    setFechaNacimiento(usuario.fechaNacimiento);
    setEstado(usuario.estado);
  };

  const handleDeleteF = async (cedula) => {
  if (!window.confirm('¿Estás seguro de eliminar este usuario definitivamente?')) return;
  try {
    // Suponiendo que `deleteUsuarioF` es otra función del API que borra directamente de la BD
    await deleteUsuarioF(cedula); // O reemplaza por deleteUsuarioF si tienes otra función en el backend
    const response = await getUsuarios();
    setUsuarios(response.data);
  } catch (error) {
    console.error('Error al eliminar definitivamente el usuario:', error);
  }
};



  return (
    <div>
      <h2>Usuarios</h2>
      <ul >
        {usuarios.map((usuario) => (
          <li key={usuario.cedula} style={{ marginBottom: '10px' }} >
            Cédula: {usuario.cedula} | {usuario.nombres} {usuario.apellidos} | 
            Email: {usuario.email} | Teléfono: {usuario.telefono} | 
            Estado: {usuario.estado}
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' , alignItems: 'center' , justifyContent: 'center'}}>
              <button onClick={() => handleEdit(usuario)} class="btn btn-outline-info" >Editar</button>
              <button onClick={() => handleDelete(usuario.cedula)} class="btn btn-outline-warning" >Desactivar</button>
              <button onClick={() => handleDeleteF(usuario.cedula)} class="btn btn-outline-danger" >Eliminar</button>
            </div>  
          </li>
        ))}
      </ul>

      <h3>{editMode ? 'Editar Usuario' : 'Crear Usuario'}</h3>
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        required
        disabled={editMode} // No se puede editar la cédula si estamos en modo de edición
      />
      <input
        type="text"
        placeholder="Nombres"
        value={nombres}
        onChange={(e) => setNombres(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellidos"
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        required
      />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="ACTIVO">ACTIVO</option>
        <option value="INACTIVO">INACTIVO</option>
      </select>
      <div style={{ marginTop: '10px' }}>
        {editMode ? (
        <button class="btn btn-outline-info" onClick={handleUpdate}>Actualizar Usuario</button>
      ) : (
        <button class="btn btn-outline-success" onClick={handleCreate}>Agregar Usuario</button>
      )}
      </div>
      
    </div>
  );
};

export default UsuarioCRUD;
