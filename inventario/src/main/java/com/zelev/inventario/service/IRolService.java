package com.zelev.inventario.service;

import java.util.List;

import com.zelev.inventario.model.Rol;

public interface IRolService {
    List<Rol> listarTodos();
    Rol buscarPorId(Long id);
    Rol guardarRol(Rol rol);
    void eliminarRol(Long id);
    Rol buscarPorNombre(String nombre);
}
