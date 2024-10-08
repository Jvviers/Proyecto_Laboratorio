INSERT INTO usuario (email, password, is_admin) VALUES ('admin@admin.com', 'admin', 1);
INSERT INTO usuario (email, password, is_admin) VALUES ('encargado1@enc.com', 'lab1', 0);
INSERT INTO usuario (email, password, is_admin) VALUES ('encargado2@enc.com', 'lab2', 0);

INSERT INTO solicitud (ref_admin, solicitante, matricula, actividad, fecha, tipo_form)
	VALUES (1, 'Juan', '1000', 'Asesoría', '2020-01-01', 'asesoria');
INSERT INTO solicitud (ref_admin, ref_enc, solicitante, matricula, actividad, tipo_proyecto, tipo_material, archivo, tipo_form)
	VALUES (1, 2, 'Diego', '1001', 'Impresión de material', 'Laboratorio', 'PLA', 'material_lab.zip', 'impresion');
INSERT INTO solicitud (ref_admin, ref_enc, solicitante, matricula, actividad, tipo_form)
	VALUES (1, 3, 'Pepe', '1002', 'Laboratorio Semana 3', 'laboratorio');
    
INSERT INTO equipo (ref_sol, nombre_equipo) VALUES (3, 'Scanner');
INSERT INTO equipo (ref_sol, nombre_equipo) VALUES (3, 'Inyetora');
INSERT INTO equipo (ref_sol, nombre_equipo) VALUES (3, 'Impresora creality FDM');