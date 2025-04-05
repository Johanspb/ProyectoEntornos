package com.zelev.inventario.model;

import java.io.Serializable;
import java.util.Objects;

public class RolUsuarioId implements Serializable {
    private String usuario;
    private Long rol;

    // Constructor vacío
    public RolUsuarioId() {}

    // Constructor con parámetros
    public RolUsuarioId(String usuario, Long rol) {
        this.usuario = usuario;
        this.rol = rol;
    }

    // Getters y Setters
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Long getRol() {
        return rol;
    }

    public void setRol(Long rol) {
        this.rol = rol;
    }

    // equals() y hashCode() para claves compuestas
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RolUsuarioId that = (RolUsuarioId) o;
        return Objects.equals(usuario, that.usuario) && Objects.equals(rol, that.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, rol);
    }
}
