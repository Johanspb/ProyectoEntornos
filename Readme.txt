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

🧾 Pedidos
Método	Endpoint	Descripción
GET	/api/pedidos	Lista todos los pedidos
GET	/api/pedidos/{id}	Obtiene un pedido por ID
POST	/api/pedidos	Crea un nuevo pedido
PUT	/api/pedidos	Actualiza un pedido existente
PUT	/api/pedidos/{id}/estado	Cambia el estado de un pedido
GET	/api/pedidos/{id}/unidades	Obtiene las unidades asociadas a un pedido
POST	/api/pedidos/{id}/agregar-unidad/{upc}	Agrega una unidad a un pedido
📦 Unidades
Método	Endpoint	Descripción
GET	/api/unidades	Lista todas las unidades
GET	/api/unidades/{upc}	Obtiene una unidad por UPC
POST	/api/unidades	Crea una nueva unidad
PUT	/api/unidades/{upc}	Actualiza una unidad
DELETE	/api/unidades/{upc}	Elimina una unidad
PUT	/api/unidades/{upc}/estado	Cambia el estado de una unidad
📁 Artículos
Método	Endpoint	Descripción
GET	/api/articulos	Lista todos los artículos
GET	/api/articulos/{id}	Obtiene un artículo por ID
POST	/api/articulos	Crea un nuevo artículo
PUT	/api/articulos/{id}	Actualiza un artículo existente
GET	/api/articulos/{id}/categorias	Obtiene las categorías de un artículo
POST	/api/articulos/{idArticulo}/categorias/{idCategoria}	Asocia una categoría a un artículo
📚 Categorías
Método	Endpoint	Descripción
GET	/api/categorias	Lista todas las categorías
GET	/api/categorias/{id}	Obtiene una categoría por ID
POST	/api/categorias	Crea una nueva categoría
PUT	/api/categorias/{id}	Actualiza una categoría existente
DELETE	/api/categorias/{id}	Elimina una categoría
GET	/api/categorias/{id}/articulos	Obtiene los artículos de una categoría
👥 Usuarios
Método	Endpoint	Descripción
GET	/api/usuarios	Lista todos los usuarios
GET	/api/usuarios/{cedula}	Obtiene un usuario por cédula
POST	/api/usuarios	Crea un nuevo usuario
PUT	/api/usuarios/{cedula}	Actualiza un usuario
DELETE	/api/usuarios/{cedula}	cambia a estado inactivo
GET	/api/usuarios/{cedula}/roles	Lista los roles de un usuario
POST	/api/usuarios/{cedula}/roles/{idRol}	Asocia un rol a un usuario
GET	/api/usuarios/estado/{estado}	Busca usuarios por estado
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

