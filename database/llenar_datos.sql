use zelev_bd;
-- Insertar roles
INSERT INTO rol (rol) VALUES 
('Administrador'),
('Vendedor'),
('Inventario'),
('Cliente');

-- Insertar usuarios (empleados y clientes)
INSERT INTO usuario (cedula, nombres, apellidos, email, telefono, direccion, contrasena, fecha_nacimiento, estado) VALUES
-- Empleados
('123456789', 'Ana María', 'Gómez Pérez', 'agomez@zelev.com', '3101234567', 'Calle 123 #45-67', SHA2('admin123', 256), '1985-05-15', 'ACTIVO'),
('987654321', 'Carlos Andrés', 'Martínez Rojas', 'cmartinez@zelev.com', '3209876543', 'Av. Principal #78-90', SHA2('vendedor1', 256), '1990-08-22', 'ACTIVO'),

-- Clientes
('100000001', 'María Fernanda', 'Rodríguez López', 'maria.rodriguez@email.com', '3151112233', 'Carrera 56 #12-34', SHA2('cliente1', 256), '1992-03-10', 'ACTIVO'),
('100000002', 'Laura Victoria', 'Fernández García', 'laura.fernandez@email.com', '3175556677', 'Diagonal 34 #56-78', SHA2('cliente2', 256), '1988-11-25', 'ACTIVO'),
('100000003', 'Sofía Alejandra', 'López Martínez', 'sofia.lopez@email.com', '3189990001', 'Transversal 78 #90-12', SHA2('cliente3', 256), '1995-07-30', 'ACTIVO');

-- Asignar roles a usuarios
INSERT INTO rol_usuario (usuario, rol) VALUES
('123456789', 1), -- Ana es Administradora
('987654321', 2), -- Carlos es Vendedor
('100000001', 4), -- María es Cliente
('100000002', 4), -- Laura es Cliente
('100000003', 4); -- Sofía es Cliente

-- Insertar categorías
INSERT INTO categoria (subcategoria, categoria) VALUES
('Manoes libres', 'Bolsos'),
('Bowling', 'Bolsos'),
(NULL, 'Morrales'),
('Tulas', 'Morrales'),
(NULL, 'Accesorios');

-- Insertar artículos
INSERT INTO articulo (nombre, descripcion, impuesto, estado) VALUES
('Mini Lili en denim y cuero', 'Bolso pequeño en denim y cuero', 19.00, 'DISPONIBLE'),
('Bowling Lili en denim y cuero', 'Bolso estilo bowling en denim y cuero', 19.00, 'DISPONIBLE'),
('Legacy de Nylon monocromático', 'Morral de nylon en un solo color', 19.00, 'DISPONIBLE'),
('Ryn de nylon reciclado', 'Tula de nylon reciclado', 19.00, 'DISPONIBLE'),
('Bloom 2 lacquard monograma', 'Morral con diseño lacado y monograma', 19.00, 'DISPONIBLE'),
('Púrpura de lona', 'Morral color púrpura en lona', 19.00, 'DISPONIBLE'),
('Mocasín de cuero', 'Bolso tipo mocasín en cuero', 19.00, 'DISPONIBLE'),
('Básico de cuero', 'Bolso básico en cuero', 19.00, 'DISPONIBLE');

-- Relacionar artículos con categorías
INSERT INTO arti_cate (articulo, categoria) VALUES
(1, 1), -- Mini Lili en Manoes libres
(2, 2), -- Bowling Lili en Bowling
(3, 3), -- Legacy en Morrales
(4, 4), -- Ryn en Tulas
(5, 3), -- Bloom en Morrales
(6, 3), -- Púrpura en Morrales
(7, 1), -- Mocasín en Manoes libres
(8, 1); -- Básico en Manoes libres

-- Insertar unidades (productos específicos)
INSERT INTO unidad (upc, label, precio, articulo, cantidad, estado, descripcion) VALUES
('MN-LILI-DENIM', 'Manoes libres mini Lili', 539900.00, 1, 10, 'DISPONIBLE', 'Bolso pequeño en denim y cuero'),
('BW-LILI-DENIM', 'Bowling Lili en denim', 629900.00, 2, 8, 'DISPONIBLE', 'Bolso estilo bowling en denim y cuero'),
('MR-LEGACY-NYLON', 'Morral Legacy', 569900.00, 3, 5, 'DISPONIBLE', 'Morral de nylon en un solo color'),
('TL-RYN-NYLON', 'Tula Ryn', 489900.00, 4, 7, 'DISPONIBLE', 'Tula de nylon reciclado'),
('MR-BLOOM-LACQUARD', 'Morral Bloom', 449900.00, 5, 6, 'DISPONIBLE', 'Morral con diseño lacado y monograma'),
('MR-PURPURA-LONA', 'Morral Púrpura', 599900.00, 6, 4, 'DISPONIBLE', 'Morral color púrpura en lona'),
('MN-MOCASIN-CUERO', 'Mocasín de cuero', 429900.00, 7, 9, 'DISPONIBLE', 'Bolso tipo mocasín en cuero'),
('MN-BASIC-CUERO', 'Básico de cuero', 249900.00, 8, 12, 'DISPONIBLE', 'Bolso básico en cuero');

-- Crear pedidos
INSERT INTO pedido (cliente, empleado, estado) VALUES
('100000001', '987654321', 'COMPLETADO'),
('100000002', '987654321', 'EN PROCESO'),
('100000003', '123456789', 'ENTREGADO');

-- Relacionar pedidos con unidades
INSERT INTO pedi_unid (pedido, unidad) VALUES
-- Pedido 1: María compra 2 productos
(1, 'MN-LILI-DENIM'),
(1, 'MR-BLOOM-LACQUARD'),

-- Pedido 2: Laura compra 1 producto
(2, 'BW-LILI-DENIM'),

-- Pedido 3: Sofía compra 3 productos
(3, 'MR-LEGACY-NYLON'),
(3, 'TL-RYN-NYLON'),
(3, 'MN-BASIC-CUERO');