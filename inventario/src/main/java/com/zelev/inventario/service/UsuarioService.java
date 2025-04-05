package com.zelev.inventario.service;

import com.zelev.inventario.model.*;
import com.zelev.inventario.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class UsuarioService {

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private RolRepository rolRepository;

    // Listar todos los usuarios
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // Buscar usuario por cédula
    public Usuario buscarPorCedula(String cedula) {
        return usuarioRepository.findById(cedula).orElse(null);
    }

    // Guardar usuario (verifica que el email no esté duplicado)
    public Usuario guardarUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado.");
        }
        return usuarioRepository.save(usuario);
    }

    // Soft delete de usuario
    public void eliminarUsuario(String cedula) {
        usuarioRepository.findById(cedula).ifPresent(usuario -> {
            usuario.setEstado("INACTIVO"); // Soft delete
            usuarioRepository.save(usuario);
        });
    }

    // Obtener roles de un usuario (evita retornar null)
    public Set<RolUsuario> obtenerRolesDeUsuario(String cedula) {
        Usuario usuario = buscarPorCedula(cedula);
        return usuario != null ? usuario.getRoles() : Collections.emptySet();
    }

    // Agregar rol a un usuario
    public boolean agregarRolAUsuario(String cedula, Long idRol) {
        Usuario usuario = usuarioRepository.findById(cedula).orElse(null);
        Rol rol = rolRepository.findById(idRol).orElse(null);

        if (usuario == null || rol == null) {
            return false;
        }

        // Verifica si el usuario ya tiene el rol
        boolean yaTieneRol = usuario.getRoles().stream()
            .anyMatch(rolUsuario -> rolUsuario.getRol().getIdRol().equals(idRol));

        if (!yaTieneRol) {
            usuario.agregarRol(rol);
            usuarioRepository.save(usuario);
            return true;
        }
        return false;
    }

    // Buscar usuarios por estado
    public List<Usuario> buscarPorEstado(String estado) {
        return usuarioRepository.findByEstado(estado);
    }

    public Usuario actualizarUsuario(String cedula, Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findById(cedula)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));
    
        // Si el email no cambia, no verificar duplicado
        if (!usuarioExistente.getEmail().equals(usuario.getEmail()) &&
            usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado.");
        }
    
        // Actualizar los campos del usuario
        usuarioExistente.setNombres(usuario.getNombres());
        usuarioExistente.setApellidos(usuario.getApellidos());
        usuarioExistente.setTelefono(usuario.getTelefono());
        usuarioExistente.setDireccion(usuario.getDireccion());
        usuarioExistente.setFechaNacimiento(usuario.getFechaNacimiento());
        usuarioExistente.setEstado(usuario.getEstado());
        // Guardar la contraseña sin encriptar
        usuarioExistente.setContrasena(usuario.getContrasena());

    
        return usuarioRepository.save(usuarioExistente);
    }
    
}
