package com.zelev.inventario.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "rol_usuario")
@IdClass(RolUsuarioId.class)  // Aquí referenciamos la clase correcta
public class RolUsuario {

    @Id
    @ManyToOne
    @JoinColumn(name = "usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @Id
    @ManyToOne
    @JoinColumn(name = "rol", nullable = false)
    private Rol rol;

    // Constructor vacío
    public RolUsuario() {}

    // Constructor con parámetros
    public RolUsuario(Usuario usuario, Rol rol) {
        this.usuario = usuario;
        this.rol = rol;
    }

    // Getters y Setters
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "RolUsuario{" +
                "usuario=" + usuario +
                ", rol=" + rol +
                '}';
    }
}
