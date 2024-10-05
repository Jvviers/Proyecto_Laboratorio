-- USER INFO
CREATE TABLE administrador(
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

-- FORM INFO
CREATE TABLE formulario(
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ref_admin INTEGER REFERENCES administrador(id),
	solicitante TEXT NOT NULL,
    matricula TEXT NOT NULL,
    actividad TEXT NOT NULL,
	fecha DATE,
    tipo_proyecto TEXT,
    tipo_material TEXT,
    archivo TEXT,
    tipo_form TEXT NOT NULL CHECK (tipo_form IN ('asesoria', 'laboratorio', 'impresion')),
    estado TEXT NOT NULL DEFAULT('en espera'),
    
    CONSTRAINT chk_fecha CHECK ((tipo_form = 'asesoria' AND fecha IS NOT NULL) OR (tipo_form != 'asesoria' AND fecha IS NULL)),
    CONSTRAINT chk_tipo_proyecto CHECK ((tipo_form = 'impresion' AND tipo_proyecto IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_proyecto IS NULL)),
    CONSTRAINT chk_tipo_material CHECK ((tipo_form = 'impresion' AND tipo_material IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_material IS NULL)),
    CONSTRAINT chk_archivo CHECK ((tipo_form = 'impresion' AND archivo IS NOT NULL) OR (tipo_form != 'impresion' AND archivo IS NULL))
);

CREATE TABLE equipo(
	ref_form INTEGER NOT NULL REFERENCES formulario(id),
    nombre_equipo TEXT NOT NULL,
    PRIMARY KEY (ref_form, nombre_equipo(50))
);

-- TRIGGERS TO VALIDATE "equipo" TABLE
DELIMITER $$
CREATE TRIGGER before_insert_equipo
BEFORE INSERT ON equipo
FOR EACH ROW
BEGIN
    DECLARE form_tipo TEXT;
    SELECT tipo_form INTO form_tipo FROM formulario WHERE id = NEW.ref_form;
    IF form_tipo != 'laboratorio' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Solo los formularios de tipo laboratorio pueden contener equipos';
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER before_update_equipo
BEFORE UPDATE ON equipo
FOR EACH ROW
BEGIN
    DECLARE form_tipo TEXT;
    SELECT tipo_form INTO form_tipo FROM formulario WHERE id = NEW.ref_form;
    IF form_tipo != 'laboratorio' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se pueden actualizar equipos en formularios que no son de tipo laboratorio';
    END IF;
END$$
DELIMITER ;