import React, { useState, useEffect } from 'react';
import { getPedidos, createPedido, updatePedido, deletePedido, getUsuarios } from '../services/api';

const PedidoCRUD = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cliente, setCliente] = useState('');
  const [empleado, setEmpleado] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');
  const [estado, setEstado] = useState('EN PROCESO');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false); // Controla el modo de edición
  const [currentPedido, setCurrentPedido] = useState(null); // Pedido que estamos editando

  // Obtener pedidos al cargar el componente
  useEffect(() => {
    const fetchPedidos = async () => {
      const response = await getPedidos();
      setPedidos(response.data);
    };
    fetchPedidos();
  }, []);

  // Validación de cédulas
  const validateCedulas = async () => {
    try {
      // Obtener todos los usuarios desde la API
      const response = await getUsuarios();
      const usuarios = response.data;

      // Validar si el cliente existe
      const clienteExistente = usuarios.find(user => user.cedula === cliente);
      if (!clienteExistente) {
        setError('Cédula de cliente no encontrada');
        return false; // Retorna false si no se encuentra el cliente
      }

      // Validar si el empleado existe y tiene el rol de "Empleado"
      const empleadoExistente = usuarios.find(user => user.cedula === empleado);
      if (!empleadoExistente) {
        setError('Cédula de empleado no encontrada');
        return false; // Retorna false si no se encuentra el empleado
      }

      // Verificar si el empleado tiene el rol de "Empleado" y no "Cliente"
      const empleadoRol = empleadoExistente.roles.some(rol => rol.rol.rol === "Vendedor");
      if (!empleadoRol) {
        setError('La cédula ingresada no corresponde a un empleado');
        return false; // Si no es un empleado, muestra un error
      }

      return { cliente: clienteExistente, empleado: empleadoExistente }; // Devuelve los objetos completos
    } catch (error) {
      setError('Error al validar las cédulas');
      return false;
    }
  };

  // Manejo de la creación de un nuevo pedido
  const handleCreate = async () => {
    const validCédulas = await validateCedulas();
    if (!validCédulas) return; // Si alguna cédula no es válida, no creamos el pedido

    const { cliente: clienteCompleto, empleado: empleadoCompleto } = validCédulas;

    const nuevoPedido = { 
      cliente: clienteCompleto, // Usamos el objeto completo de cliente
      empleado: empleadoCompleto, // Usamos el objeto completo de empleado
      fechaPedido, 
      estado 
    };

    try {
      await createPedido(nuevoPedido);
      setError(''); // Limpiar cualquier mensaje de error
      clearForm();
      const response = await getPedidos();
      setPedidos(response.data); // Actualiza la lista de pedidos
    } catch (error) {
      setError('Error al crear el pedido');
    }
  };

  // Manejo de la actualización de un pedido
  const handleUpdate = async () => {
    const validCédulas = await validateCedulas();
    if (!validCédulas) return;

    const { cliente: clienteCompleto, empleado: empleadoCompleto } = validCédulas;
    const updatedPedido = {
      id: currentPedido.id,
      cliente: clienteCompleto,
      empleado: empleadoCompleto,
      fechaPedido,
      estado
    };

    try {
      await updatePedido(updatedPedido);
      setError('');
      setEditMode(false);
      clearForm();
      const response = await getPedidos();
      setPedidos(response.data); // Actualiza la lista de pedidos
    } catch (error) {
      setError('Error al actualizar el pedido');
    }
  };

  // Limpiar el formulario
  const clearForm = () => {
    setCliente('');
    setEmpleado('');
    setFechaPedido('');
    setEstado('EN PROCESO');
    setCurrentPedido(null); // Limpiar pedido actual en edición
  };

  // Manejo de la edición de un pedido
  const handleEdit = (pedido) => {
    setEditMode(true);
    setCurrentPedido(pedido);
    setCliente(pedido.cliente.cedula);
    setEmpleado(pedido.empleado.cedula);
    setFechaPedido(pedido.fechaPedido);
    setEstado(pedido.estado);
  };

  return (
    <div>
      <h2>Pedidos</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mostrar mensaje de error si existe */}

      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            Pedido ID: {pedido.id} | Cliente: {pedido.cliente.nombres} {pedido.cliente.apellidos} | 
            Empleado: {pedido.empleado.nombres} {pedido.empleado.apellidos} | Estado: {pedido.estado} 
            <button onClick={() => handleEdit(pedido)}>Editar</button>
          </li>
        ))}
      </ul>

      <h3>{editMode ? 'Editar Pedido' : 'Crear Pedido'}</h3>
      <input
        type="text"
        placeholder="Cliente (Cédula)"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Empleado (Cédula)"
        value={empleado}
        onChange={(e) => setEmpleado(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Fecha de Pedido"
        value={fechaPedido}
        onChange={(e) => setFechaPedido(e.target.value)}
        required
      />
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="EN PROCESO">EN PROCESO</option>
        <option value="COMPLETADO">COMPLETADO</option>
        <option value="ENTREGADO">ENTREGADO</option>
      </select>
      {editMode ? (
        <button onClick={handleUpdate}>Actualizar Pedido</button>
      ) : (
        <button onClick={handleCreate}>Agregar Pedido</button>
      )}
    </div>
  );
};

export default PedidoCRUD;
