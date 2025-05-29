# 📦 Zelev Inventario - Sistema de Gestión de Pedidos y Unidades

**Zelev Inventario** es una aplicación backend desarrollada con **Spring Boot** para la gestión de pedidos, unidades de inventario, artículos y usuarios. Está diseñada como parte de un sistema de control de stock con pedidos personalizados y roles diferenciados para clientes y empleados.

---

## 🚀 Tecnologías utilizadas

- Java 17  
- Spring Boot 3.x  
- Spring Data JPA  
- Hibernate  
- MySQL  
- Jackson (serialización JSON)  
- Maven  

---
## Integrantes

-Johan Stiven Peñaranda Basto
-Vanesa Alexandra Corredor Cepeda 
-Juan Nicolás Garcia Vega

---
## 🧱 Arquitectura y diseño

La aplicación sigue una arquitectura **MVC** con persistencia basada en **JPA**, que mapea entidades a una base de datos relacional.

### 📄 Entidades principales

- **Usuario**: Puede tener rol de cliente o empleado.  
- **Unidad**: Representa un producto individual disponible para la venta.  
- **Pedido**: Contiene los detalles del pedido, realizado por un cliente y atendido por un empleado.  
- **PediUnid**: Entidad intermedia entre `Pedido` y `Unidad`, que permite pedidos con múltiples unidades, incluyendo información adicional como `cantidad`.  
- **Artículo**: Agrupa unidades según tipo, marca u otras categorías.

### 🔁 Relaciones entre entidades

- Un **Pedido** puede incluir múltiples **Unidades** (relación muchos a muchos con `PediUnid`).  
- Una **Unidad** puede estar asociada a varios **Pedidos**.  
- Un **Usuario** puede tener múltiples pedidos (como cliente o empleado).  

---

## 🌐 Endpoints principales

### 🧾 Pedidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pedidos` | Lista todos los pedidos |
| GET | `/api/pedidos/{id}` | Obtiene un pedido por ID |
| POST | `/api/pedidos` | Crea un nuevo pedido |
| PUT | `/api/pedidos` | Actualiza un pedido existente |
| PUT | `/api/pedidos/{id}/estado` | Cambia el estado de un pedido |
| GET | `/api/pedidos/{id}/unidades` | Obtiene las unidades de un pedido |
| POST | `/api/pedidos/{id}/agregar-unidad/{upc}` | Agrega una unidad a un pedido |
| DELETE | `/api/{id}` | Elimina un pedido |

---

### 📦 Unidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/unidades` | Lista todas las unidades |
| GET | `/api/unidades/{upc}` | Obtiene una unidad por su UPC |
| POST | `/api/unidades` | Crea una nueva unidad |
| PUT | `/api/unidades/{upc}` | Actualiza una unidad |
| DELETE | `/api/unidades/{upc}` | Elimina una unidad |
| PUT | `/api/unidades/{upc}/estado` | Cambia el estado de una unidad |

---

### 📁 Artículos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/articulos` | Lista todos los artículos |
| GET | `/api/articulos/{id}` | Obtiene un artículo por ID |
| POST | `/api/articulos` | Crea un nuevo artículo |
| PUT | `/api/articulos/{id}` | Actualiza un artículo existente |
| GET | `/api/articulos/{id}/categorias` | Obtiene las categorías asociadas a un artículo |
| POST | `/api/articulos/{idArticulo}/categorias/{idCategoria}` | Asocia una categoría a un artículo |

---

### 📚 Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias` | Lista todas las categorías |
| GET | `/api/categorias/{id}` | Obtiene una categoría por ID |
| POST | `/api/categorias` | Crea una nueva categoría |
| PUT | `/api/categorias/{id}` | Actualiza una categoría |
| DELETE | `/api/categorias/{id}` | Elimina una categoría |
| GET | `/api/categorias/{id}/articulos` | Obtiene los artículos de una categoría |

---

### 👥 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Lista todos los usuarios |
| GET | `/api/usuarios/{cedula}` | Obtiene un usuario por cédula |
| POST | `/api/usuarios` | Crea un nuevo usuario |
| PUT | `/api/usuarios/{cedula}` | Actualiza un usuario |
| DELETE | `/api/usuarios/{cedula}` | Cambia el estado del usuario a inactivo |
| GET | `/api/usuarios/{cedula}/roles` | Lista los roles de un usuario |
| POST | `/api/usuarios/{cedula}/roles/{idRol}` | Asocia un rol a un usuario |
| GET | `/api/usuarios/estado/{estado}` | Filtra usuarios por estado |
| DELETE | `/api/usuarios/{cedula}/hard` | Elimina de la base el usuario que no tenga un pedido realcionado |

---

## ⚙️ Configuración del proyecto

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/zelev-inventario.git
