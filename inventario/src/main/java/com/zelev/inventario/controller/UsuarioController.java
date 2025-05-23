package com.zelev.inventario.controller;

import com.zelev.inventario.model.Rol;
import com.zelev.inventario.model.RolUsuario;
import com.zelev.inventario.model.Usuario;
import com.zelev.inventario.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return new ResponseEntity<>(usuarioService.listarTodos(), HttpStatus.OK);
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable String cedula) {
        Usuario usuario = usuarioService.buscarPorCedula(cedula);
        return usuario != null ? 
            new ResponseEntity<>(usuario, HttpStatus.OK) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        return new ResponseEntity<>(usuarioService.guardarUsuario(usuario), HttpStatus.CREATED);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable String cedula, 
            @RequestBody Usuario usuario) {
        if (!usuario.getCedula().equals(cedula)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(usuarioService.actualizarUsuario(cedula, usuario), HttpStatus.OK);
    }
    

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable String cedula) {
        usuarioService.eliminarUsuario(cedula);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{cedula}/roles")
    public ResponseEntity<Set<Rol>> obtenerRolesDeUsuario(@PathVariable String cedula) {
        Set<RolUsuario> rolesUsuario = usuarioService.obtenerRolesDeUsuario(cedula);
        Set<Rol> roles = rolesUsuario != null ? 
            rolesUsuario.stream().map(RolUsuario::getRol).collect(Collectors.toSet()) : 
            null;
        return roles != null ? 
            new ResponseEntity<>(roles, HttpStatus.OK) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{cedula}/roles/{idRol}")
    public ResponseEntity<Void> agregarRolAUsuario(
            @PathVariable String cedula, 
            @PathVariable Long idRol) {
        boolean resultado = usuarioService.agregarRolAUsuario(cedula, idRol);
        return resultado ? 
            new ResponseEntity<>(HttpStatus.CREATED) : 
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Usuario>> buscarPorEstado(@PathVariable String estado) {
        return new ResponseEntity<>(usuarioService.buscarPorEstado(estado), HttpStatus.OK);
    }

    // Eliminar físicamente un usuario por cédula
    @DeleteMapping("/{cedula}/hard")
    public ResponseEntity<Void> eliminarUsuarioFisico(@PathVariable String cedula) {
    boolean eliminado = usuarioService.eliminarUsuarioFisico(cedula);
    return eliminado ?
        new ResponseEntity<>(HttpStatus.NO_CONTENT) :
        new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}