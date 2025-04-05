CREATE DATABASE zelev_bd;
USE zelev_bd;

CREATE TABLE usuario (
    cedula VARCHAR(20) PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT,
    contrasena VARCHAR(255),
    fecha_nacimiento DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20)
);

CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE rol_usuario (
    usuario VARCHAR(20),
    rol INT,
    PRIMARY KEY (usuario, rol),
    FOREIGN KEY (usuario) REFERENCES usuario(cedula),
    FOREIGN KEY (rol) REFERENCES rol(id_rol)
);

CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(20),
    empleado VARCHAR(20),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20),
    FOREIGN KEY (cliente) REFERENCES usuario(cedula),
    FOREIGN KEY (empleado) REFERENCES usuario(cedula)
);

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    subcategoria VARCHAR(100),
    categoria VARCHAR(100)
);

CREATE TABLE articulo (
    id_articulo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    impuesto DECIMAL(5,2),
    estado VARCHAR(20)
);

CREATE TABLE arti_cate (
    articulo INT,
    categoria INT,
    PRIMARY KEY (articulo, categoria),
    FOREIGN KEY (articulo) REFERENCES articulo(id_articulo),
    FOREIGN KEY (categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE unidad (
    upc VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100),
    precio DECIMAL(10,2),
    articulo INT,
    cantidad INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20),
    descripcion TEXT,
    FOREIGN KEY (articulo) REFERENCES articulo(id_articulo)
);

CREATE TABLE pedi_unid (
    pedido INT,
    unidad VARCHAR(50),
    PRIMARY KEY (pedido, unidad),
    FOREIGN KEY (pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (unidad) REFERENCES unidad(upc)
);
