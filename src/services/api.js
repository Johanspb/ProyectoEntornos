// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Cambia a tu URL backend
});

export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response;
  } catch (error) {
    throw new Error('No se pudo obtener los usuarios');
  }
};

export const createUsuario = async (usuario) => {
  try {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};

export const updateUsuario = async (usuario) => {
  try {
    const response = await api.put(`/usuarios/${usuario.cedula}`, usuario);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el usuario');
  }
};

export const deleteUsuario = async (cedula) => {
  try {
    const response = await api.delete(`/usuarios/${cedula}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el usuario');
  }
};


// Obtener todos los artículos
export const getArticulos = async () => {
  try {
    const response = await api.get('/articulos');
    return response;
  } catch (error) {
    throw new Error('No se pudo obtener los artículos');
  }
};

// Crear un nuevo artículo
export const createArticulo = async (articulo) => {
  try {
    const response = await api.post('/articulos', articulo);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el artículo');
  }
};

// Actualizar un artículo
export const updateArticulo = async (articulo) => {
  try {
    const response = await api.put(`/articulos/${articulo.id}`, articulo);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el artículo');
  }
};

// Obtener todos los pedidos
export const getPedidos = async () => {
  try {
    const response = await api.get('/pedidos');
    return response;
  } catch (error) {
    throw new Error('No se pudo obtener los pedidos');
  }
};

// Crear un nuevo pedido
export const createPedido = async (pedido) => {
  try {
    const response = await api.post('/pedidos', pedido);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el pedido');
  }
};

// Actualizar un pedido
export const updatePedido = async (pedido) => {
  try {
    console.log("Actualizando pedido en API:", pedido);  // Verificar los datos que estamos enviando
    const response = await api.put(`/pedidos/${pedido.id}`, pedido);
    console.log("Respuesta de la API:", response);  // Verificar la respuesta del backend
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el pedido');
  }
};


// Eliminar un pedido
export const deletePedido = async (id) => {
  try {
    const response = await api.delete(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el pedido');
  }
};


// Obtener todas las unidades
export const getUnidades = async () => {
  try {
    const response = await api.get('/unidades');
    return response;
  } catch (error) {
    throw new Error('No se pudo obtener las unidades');
  }
};

// Crear una nueva unidad
export const createUnidad = async (unidad) => {
  try {
    const response = await api.post('/unidades', unidad);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la unidad');
  }
};

// Actualizar una unidad
export const updateUnidad = async (unidad) => {
  try {
    const response = await api.put(`/unidades/${unidad.upc}`, unidad);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la unidad');
  }
};

// Eliminar una unidad
export const deleteUnidad = async (upc) => {
  try {
    const response = await api.delete(`/unidades/${upc}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar la unidad');
  }
};