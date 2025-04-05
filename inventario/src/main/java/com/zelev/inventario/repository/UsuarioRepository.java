package com.zelev.inventario.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zelev.inventario.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
      // Usar Optional para evitar NullPointerException
    List<Usuario> findByEstado(String estado);
    boolean existsByEmail(String email); // Verifica si el email ya está registrado

        
}
