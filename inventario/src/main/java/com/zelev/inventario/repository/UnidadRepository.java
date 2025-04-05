package com.zelev.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zelev.inventario.model.Unidad;

import java.util.List;

@Repository
public interface UnidadRepository extends JpaRepository<Unidad, String> {
    List<Unidad> findByArticuloId(Long idArticulo);
    List<Unidad> findByEstado(String estado);
    List<Unidad> findByPrecioBetween(Double min, Double max);
}