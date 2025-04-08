# 📦 Zelev Inventario - Sistema de Gestión de Pedidos y Unidades

Este proyecto es una aplicación desarrollada con **Spring Boot** que permite gestionar pedidos, unidades de inventario, artículos y usuarios. Está diseñado para funcionar como el backend de un sistema de gestión de inventario con pedidos personalizados y control de stock.

## 🚀 Tecnologías utilizadas

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- MySQL
- Hibernate
- Jackson (para serialización JSON)
- Maven

## 🧱 Arquitectura y diseño

La aplicación sigue una arquitectura MVC y utiliza JPA para mapear entidades a una base de datos relacional.

### 📄 Entidades principales

- `Usuario`: Puede ser cliente o empleado.
- `Unidad`: Representa una unidad de producto disponible para la venta.
- `Pedido`: Contiene la información del pedido realizado por un cliente y atendido por un empleado.
- `PediUnid`: Entidad intermedia que conecta `Pedido` y `Unidad`, permitiendo pedidos con múltiples unidades (relación Many-to-Many con atributos adicionales como `cantidad`).
- `Articulo`: Categoriza las unidades (ej. tipo de producto, marca, etc).

### 🔁 Relaciones entre entidades

- Un **Pedido** puede tener muchas **Unidades** (a través de `PediUnid`).
- Una **Unidad** puede estar en muchos **Pedidos**.
- Un **Usuario** puede ser cliente o empleado en muchos pedidos.

### 🌐 Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pedidos` | Listar todos los pedidos |
| GET | `/api/pedidos/{id}` | Obtener pedido por ID |
| POST | `/api/pedidos` | Crear nuevo pedido |
| PUT | `/api/pedidos/{id}/estado` | Cambiar estado del pedido |
| POST | `/api/pedidos/{id}/agregar-unidad/{upc}` | Agregar unidad a un pedido |
| GET | `/api/unidades` | Listar todas las unidades |
| GET | `/api/unidades/{upc}` | Obtener unidad por código UPC |

## ⚙️ Configuración

1. Clona el repositorio
2. Configura tu archivo `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/zelev_bd
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

