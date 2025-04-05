package com.zelev.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zelev.inventario.model.Articulo;

import java.util.List;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
    List<Articulo> findByNombreContaining(String nombre);
    List<Articulo> findByEstado(String estado);
}