// src/components/ArticuloCRUD.js
import React, { useState, useEffect } from 'react';
import { getArticulos, createArticulo, updateArticulo, deleteArticulo } from '../services/api';

const ArticuloCRUD = () => {
  const [articulos, setArticulos] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [impuesto, setImpuesto] = useState('');
  const [estado, setEstado] = useState('DISPONIBLE'); // Valor por defecto
  const [unidades, setUnidades] = useState([]);
  
  const [editMode, setEditMode] = useState(false); // Modo de edición
  const [currentArticulo, setCurrentArticulo] = useState(null); // Artículo que estamos editando

  // Obtener artículos al cargar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      const response = await getArticulos();
      setArticulos(response.data);
    };
    fetchArticulos();
  }, []);

  // Manejo de la creación de un nuevo artículo
  const handleCreate = async () => {
    const nuevoArticulo = { 
      nombre, 
      descripcion, 
      impuesto, 
      estado, 
      unidades
    };

    try {
      await createArticulo(nuevoArticulo);
      clearForm();
      const response = await getArticulos();
      setArticulos(response.data); // Actualiza la lista de artículos
    } catch (error) {
      console.error('Error al crear el artículo:', error);
    }
  };

  // Manejo de la actualización de un artículo
  const handleUpdate = async () => {
    const updatedArticulo = {
      id,
      nombre,
      descripcion,
      impuesto,
      estado,
      unidades
    };

    try {
      await updateArticulo(updatedArticulo); // Actualiza el artículo en el backend
      clearForm();
      setEditMode(false); // Salir del modo de edición
      const response = await getArticulos(); // Obtener la lista actualizada de artículos
      setArticulos(response.data);
    } catch (error) {
      console.error('Error al actualizar el artículo:', error);
    }
  };


  // Limpiar el formulario
  const clearForm = () => {
    setId('');
    setNombre('');
    setDescripcion('');
    setImpuesto('');
    setEstado('DISPONIBLE');
    setUnidades([]);
  };

  // Manejo de la edición de un artículo
  const handleEdit = (articulo) => {
    setEditMode(true);
    setCurrentArticulo(articulo);
    setId(articulo.id);
    setNombre(articulo.nombre);
    setDescripcion(articulo.descripcion);
    setImpuesto(articulo.impuesto);
    setEstado(articulo.estado);
    setUnidades(articulo.unidades);
  };

  return (
    <div>
      <h2>Artículos</h2>
      <ul>
        {articulos.map((articulo) => (
          <li key={articulo.id}>
            {articulo.nombre} - {articulo.descripcion} | Estado: {articulo.estado} | Impuesto: {articulo.impuesto}%
            <button onClick={() => handleEdit(articulo)}>Editar</button>
          </li>
        ))}
      </ul>

      <h3>{editMode ? 'Editar Artículo' : 'Crear Artículo'}</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Impuesto (%)"
        value={impuesto}
        onChange={(e) => setImpuesto(e.target.value)}
        required
      />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="DISPONIBLE">DISPONIBLE</option>
        <option value="NO DISPONIBLE">NO DISPONIBLE</option>
      </select>
      <button onClick={editMode ? handleUpdate : handleCreate}>
        {editMode ? 'Actualizar Artículo' : 'Agregar Artículo'}
      </button>
    </div>
  );
};

export default ArticuloCRUD;
