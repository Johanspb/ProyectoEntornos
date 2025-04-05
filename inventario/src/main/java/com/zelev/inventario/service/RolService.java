package com.zelev.inventario.service;

import com.zelev.inventario.model.Rol;
import com.zelev.inventario.repository.RolRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class RolService implements IRolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Override
    public List<Rol> listarTodos() {
        return rolRepository.findAll();
    }

    @Override
    public Rol buscarPorId(Long id) {
        return rolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado con ID: " + id));
    }

    @Override
    public Rol guardarRol(Rol rol) {
        // Validar que el nombre del rol no exista
        if (rolRepository.existsByRol(rol.getRol())) { // Corrección: ahora verifica por nombre
            throw new RuntimeException("Ya existe un rol con el nombre: " + rol.getRol());
        }
        return rolRepository.save(rol);
    }

    @Override
    public void eliminarRol(Long id) {
        // Verificar si el rol existe antes de eliminar
        Rol rol = buscarPorId(id);
        
        if (!rol.getUsuarios().isEmpty()) {
            throw new RuntimeException("No se puede eliminar el rol porque está asignado a usuarios.");
        }

        rolRepository.deleteById(id);
    }

    @Override
    public Rol buscarPorNombre(String nombre) {
        return rolRepository.findAll().stream()
                .filter(r -> r.getRol().equalsIgnoreCase(nombre))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Rol no encontrado con nombre: " + nombre));
    }
}
