package com.zelev.inventario.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;

    @Column(name = "rol", nullable = false, unique = true)
    private String rol;

    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<RolUsuario> usuarios = new HashSet<>();

    // Constructores
    public Rol() {}

    public Rol(String rol) {
        this.rol = rol;
    }

    // Getters y Setters
    public Long getIdRol() {
        return idRol;
    }

    public void setIdRol(Long idRol) {
        this.idRol = idRol;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Set<RolUsuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<RolUsuario> usuarios) {
        this.usuarios = usuarios;
    }
    

    // equals() y hashCode() basados en idRol
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rol rol1 = (Rol) o;
        return Objects.equals(idRol, rol1.idRol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRol);
    }
}
