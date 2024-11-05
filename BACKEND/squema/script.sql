-- USER INFO
CREATE TABLE usuario(
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL
);

-- FORM INFO
CREATE TABLE solicitud(
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ref_enc INTEGER REFERENCES usuario(id),
	solicitante TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    matricula TEXT NOT NULL,
    actividad TEXT NOT NULL,
	fecha TIMESTAMP,
    tipo_proyecto TEXT,
    tipo_material TEXT,
    nombre_archivo VARCHAR(255),
    contenido_archivo LONGBLOB,
    tipo_form TEXT NOT NULL CHECK (tipo_form IN ('asesoria', 'laboratorio', 'impresion')),
    estado TEXT NOT NULL DEFAULT('en espera'),
    
    CONSTRAINT chk_fecha CHECK ((tipo_form = 'asesoria' AND fecha IS NOT NULL) OR (tipo_form != 'asesoria' AND fecha IS NULL)),
    CONSTRAINT chk_tipo_proyecto CHECK ((tipo_form = 'impresion' AND tipo_proyecto IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_proyecto IS NULL)),
    CONSTRAINT chk_tipo_material CHECK ((tipo_form = 'impresion' AND tipo_material IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_material IS NULL)),
    CONSTRAINT chk_nombre_archivo CHECK ((tipo_form != 'impresion' AND nombre_archivo IS NULL) OR (tipo_form = 'impresion')),
    CONSTRAINT chk_contenido_archivo CHECK ((tipo_form != 'impresion' AND contenido_archivo IS NULL) OR (tipo_form = 'impresion')),
    CONSTRAINT chk_ref_enc CHECK ((tipo_form = 'asesoria' AND ref_enc IS NULL) OR (tipo_form != 'asesoria'))
);

CREATE TABLE equipo(
	ref_sol INTEGER NOT NULL REFERENCES solicitud(id),
    nombre_equipo TEXT NOT NULL,
    PRIMARY KEY (ref_sol, nombre_equipo(50))
);

-- CARRUSEL Y NOTICIAS
CREATE TABLE imagencarrusel(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
	url TEXT NOT NULL,
);

CREATE TABLE noticia(
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    url TEXT NOT NULL,
    public_id VARCHAR(255) NOT NULL
);

-- MANTENEDORES
CREATE TABLE nombreequipos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tipomaterial(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tipoproyecto(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO nombreequipos (nombre) VALUES ('Impresora Creality FDM');
INSERT INTO nombreequipos (nombre) VALUES ('Impresoras Creality Resina');
INSERT INTO nombreequipos (nombre) VALUES ('Impresoras Stratasys');
INSERT INTO nombreequipos (nombre) VALUES ('Extrusora');
INSERT INTO nombreequipos (nombre) VALUES ('Inyectora');
INSERT INTO nombreequipos (nombre) VALUES ('Scanner');

INSERT INTO tipomaterial (nombre) VALUES ('PLA');
INSERT INTO tipomaterial (nombre) VALUES ('ABS');

INSERT INTO tipoproyecto (nombre) VALUES ('Personal');
INSERT INTO tipoproyecto (nombre) VALUES ('Curso');
INSERT INTO tipoproyecto (nombre) VALUES ('Proyecto');

-- VALIDATION TRIGGERS
DELIMITER $$
CREATE TRIGGER before_insert_equipo
BEFORE INSERT ON equipo
FOR EACH ROW
BEGIN
    DECLARE tipo TEXT;
    SELECT tipo_form INTO tipo FROM solicitud WHERE id = NEW.ref_sol;
    IF tipo != 'laboratorio' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Solo las solicitudes de tipo laboratorio pueden contener equipos';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_update_equipo
BEFORE UPDATE ON equipo
FOR EACH ROW
BEGIN
    DECLARE tipo TEXT;
    SELECT tipo_form INTO tipo FROM solicitud WHERE id = NEW.ref_sol;
    IF tipo != 'laboratorio' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se pueden actualizar equipos en solicitudes que no son de tipo laboratorio';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_insert_solicitud
BEFORE INSERT ON solicitud
FOR EACH ROW
BEGIN
    DECLARE enc_is_admin BOOLEAN;
    SELECT is_admin INTO enc_is_admin FROM usuario WHERE id = NEW.ref_enc;
    IF enc_is_admin THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El id proporcionado para el encargado de laboratorio no es válido';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_update_solicitud
BEFORE UPDATE ON solicitud
FOR EACH ROW
BEGIN
    DECLARE enc_is_admin BOOLEAN;
    SELECT is_admin INTO enc_is_admin FROM usuario WHERE id = NEW.ref_enc;
    IF enc_is_admin THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El id proporcionado para el encargado de laboratorio no es válido';
    END IF;
END$$
DELIMITER ;