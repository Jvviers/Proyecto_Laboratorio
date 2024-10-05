-- USER INFO
CREATE TABLE administrador(
    id integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email text NOT NULL,
    password text NOT NULL
);

/* CREATE TABLE encargado(
    email text NOT NULL PRIMARY KEY,
    password text NOT NULL
); */

-- FORM INFO
CREATE TABLE formulario(
	id integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    ref_admin integer REFERENCES administrador(id),
	solicitante text NOT NULL,
    matricula text NOT NULL,
    actividad text NOT NULL,
	fecha date,
    tipo_proyecto text,
    tipo_material text,
    archivo text,
    tipo_form text NOT NULL check (tipo_form in ('asesoria', 'laboratorio', 'impresion')),
    estado text NOT NULL DEFAULT('en espera'),
    
    CONSTRAINT chk_fecha CHECK ((tipo_form = 'asesoria' AND fecha IS NOT NULL) OR (tipo_form != 'asesoria' AND fecha IS NULL)),
    CONSTRAINT chk_tipo_proyecto CHECK ((tipo_form = 'impresion' AND tipo_proyecto IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_proyecto IS NULL)),
    CONSTRAINT chk_tipo_material CHECK ((tipo_form = 'impresion' AND tipo_material IS NOT NULL) OR (tipo_form != 'impresion' AND tipo_material IS NULL)),
    CONSTRAINT chk_archivo CHECK ((tipo_form = 'impresion' AND archivo IS NOT NULL) OR (tipo_form != 'impresion' AND archivo IS NULL))
);

CREATE TABLE equipo(
	ref_form integer NOT NULL REFERENCES formulario(id),
    nombre_equipo text NOT NULL,
    PRIMARY KEY (ref_form, nombre_equipo(50))
);