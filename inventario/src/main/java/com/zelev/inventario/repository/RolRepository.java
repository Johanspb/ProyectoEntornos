package com.zelev.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.zelev.inventario.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    boolean existsByRol(String rol);  // Corregido: rol es String, no Long
    boolean existsByIdRol(Long idRol);  // Corregido: idRol en vez de id_rol
}
