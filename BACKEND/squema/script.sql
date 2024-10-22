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
    archivo TEXT,
    tipo_form TEXT NOT NULL CHECK (tipo_form IN ('asesoria', 'laboratorio', 'impresion')),
    estado TEXT NOT NULL DEFAULT('en espera'),
    
    CONSTRAINT chk_fecha CHECK ((tipo_form = 'asesoria' AND fecha IS NOT NULL) OR (tipo_form != 'asesoria' AND fecha IS NULL)),
    CONSTRAINT chk_tipo_proyecto CHECK ((tipo_form = 'impresion' AND tipo_proyecto IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_proyecto IS NULL)),
    CONSTRAINT chk_tipo_material CHECK ((tipo_form = 'impresion' AND tipo_material IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_material IS NULL)),
    CONSTRAINT chk_archivo CHECK ((tipo_form != 'impresion' AND archivo IS NULL) OR (tipo_form = 'impresion')),
    CONSTRAINT chk_ref_enc CHECK ((tipo_form = 'asesoria' AND ref_enc IS NULL) OR (tipo_form != 'asesoria'))
);

CREATE TABLE equipo(
	ref_sol INTEGER NOT NULL REFERENCES solicitud(id),
    id INTEGER NOT NULL AUTO_INCREMENT,
    nombre_equipo TEXT NOT NULL,
    PRIMARY KEY (ref_sol, id)
);

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