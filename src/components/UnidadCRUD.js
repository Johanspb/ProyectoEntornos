// src/components/UnidadCRUD.js
import React, { useState, useEffect } from 'react';
import { getUnidades, createUnidad, updateUnidad, deleteUnidad } from '../services/api';

const UnidadCRUD = () => {
  const [unidades, setUnidades] = useState([]);
  
  // Campos para crear o actualizar una unidad
  const [upc, setUpc] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estado, setEstado] = useState('DISPONIBLE'); // Valor por defecto
  const [descripcion, setDescripcion] = useState('');
  const [articuloId, setArticuloId] = useState(''); // Relacionado con el artículo
  
  const [editMode, setEditMode] = useState(false); // Modo de edición
  const [currentUnidad, setCurrentUnidad] = useState(null); // Unidad que estamos editando

  // Obtener unidades al cargar el componente
  useEffect(() => {
    const fetchUnidades = async () => {
      const response = await getUnidades();
      setUnidades(response.data);
    };
    fetchUnidades();
  }, []);

  // Manejo de la creación de una nueva unidad
  const handleCreate = async () => {
    const nuevaUnidad = { 
      upc, 
      nombre, 
      precio, 
      cantidad, 
      estado, 
      descripcion, 
      articuloId 
    };

    try {
      await createUnidad(nuevaUnidad);
      clearForm();
      const response = await getUnidades();
      setUnidades(response.data); // Actualiza la lista de unidades
    } catch (error) {
      console.error('Error al crear la unidad:', error);
    }
  };

  // Manejo de la actualización de una unidad
  const handleUpdate = async () => {
    const updatedUnidad = {
      upc,
      nombre,
      precio,
      cantidad,
      estado,
      descripcion,
      articuloId
    };

    try {
      await updateUnidad(updatedUnidad); // Actualiza la unidad en el backend
      clearForm();
      setEditMode(false); // Salir del modo de edición
      const response = await getUnidades(); // Obtener la lista actualizada de unidades
      setUnidades(response.data);
    } catch (error) {
      console.error('Error al actualizar la unidad:', error);
    }
  };


  // Limpiar el formulario
  const clearForm = () => {
    setUpc('');
    setNombre('');
    setPrecio('');
    setCantidad('');
    setEstado('DISPONIBLE');
    setDescripcion('');
    setArticuloId('');
  };

  // Manejo de la edición de una unidad
  const handleEdit = (unidad) => {
    setEditMode(true);
    setCurrentUnidad(unidad);
    setUpc(unidad.upc);
    setNombre(unidad.nombre);
    setPrecio(unidad.precio);
    setCantidad(unidad.cantidad);
    setEstado(unidad.estado);
    setDescripcion(unidad.descripcion);
    setArticuloId(unidad.articuloId);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Unidades</h2>
      <ul>
        {unidades.map((unidad) => (
          <li key={unidad.upc} style={{ marginBottom: '10px' }}>
            {unidad.nombre} - {unidad.descripcion} | Precio: {unidad.precio} | Cantidad: {unidad.cantidad} | Estado: {unidad.estado}
            <div >
              <button class="btn btn-outline-info" onClick={() => handleEdit(unidad)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>

      <h3>{editMode ? 'Editar Unidad' : 'Crear Unidad'}</h3>
      <input
        type="text"
        placeholder="UPC"
        value={upc}
        onChange={(e) => setUpc(e.target.value)}
        required
        disabled={editMode} // No se puede editar el UPC si estamos en modo de edición
      />
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="DISPONIBLE">DISPONIBLE</option>
        <option value="NO DISPONIBLE">NO DISPONIBLE</option>
      </select>
      <input
        type="text"
        placeholder="ID del Artículo"
        value={articuloId}
        onChange={(e) => setArticuloId(e.target.value)}
        required
      />
      <div style={{ marginTop: '10px' }}>
         {editMode ? (
        <button class="btn btn-outline-info" onClick={handleUpdate}>Actualizar Unidad</button>
      ) : (
        <button class="btn btn-outline-success" onClick={handleCreate}>Agregar Unidad</button>
      )}
      </div>
    </div>
  );
};

export default UnidadCRUD;
