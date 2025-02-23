import { Router } from 'express';
import Controller from '../controllers/controllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';
import sseController from '../controllers/sseController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();


// Rutas para obtener datos de solicitudes
router.get('/solicitudes', Controller.getSolicitudes);
router.get('/solicitudes/:id', Controller.getSolicitudesById);
router.get('/equipo/:id', Controller.getEquipoById);
router.get('/download/:id', Controller.downloadMaterial);
router.get('/encargado', Controller.getMailEncargado);
router.get('/observer', sseController.eventsHandler);

// Rutas para el envío de solicitudes
router.post('/asesoria', Controller.postAsesoria);
router.post('/materiales', upload.single('file'), Controller.postMateriales);
router.post('/equipos', Controller.postEquipos);
router.post('/equipo', Controller.postEquipo);

// Rutas para la gestión de solicitudes
router.post('/encargado-solicitud', authMiddleware, Controller.postEncargadoSolicitud);
router.post('/estado-solicitud', authMiddleware, Controller.postEstadoSolicitud);
router.delete('/solicitud', authMiddleware, Controller.deleteSolicitud);
router.post('/correo', Controller.sendCorreo);

// Rutas para obtener los mantenedores
router.get('/encargados', Controller.getEncargados);
router.get('/nombre-equipos', Controller.getNombreEquipos);
router.get('/tipo-material', Controller.getTipoMaterial);
router.get('/tipo-proyecto', Controller.getTipoProyecto);

// Rutas para agregar mantenedores
router.post('/register', Controller.register);
router.post('/nombre-equipos', Controller.postNombreEquipos);
router.post('/tipo-material', Controller.postTipoMaterial);
router.post('/tipo-proyecto', Controller.postTipoProyecto);

// Rutas para eliminar mantenedores
router.delete('/encargado', Controller.deleteEncargado);
router.delete('/nombre-equipos', Controller.deleteNombreEquipos);
router.delete('/tipo-material', Controller.deleteTipoMaterial);
router.delete('/tipo-proyecto', Controller.deleteTipoProyecto);

// Rutas para editar mantenedores
router.put('/encargado', Controller.putEncargado);
router.put('/nombre-equipos', Controller.putNombreEquipos);
router.put('/tipo-material', Controller.putTipoMaterial);
router.put('/tipo-proyecto', Controller.putTipoProyecto);

// Rutas para la gestión de logos de los laboratorios
router.get('/logos', Controller.getLogos);
router.post('/logos', Controller.postLogos);
router.delete('/logos', Controller.deleteLogos);

// Rutas para la gestión de imagenes del carrusel
router.get('/carrusel', Controller.getCarrusel);
router.post('/carrusel', Controller.postCarrusel);
router.delete('/carrusel', Controller.deleteCarrusel);

// Rutas para noticias
router.get('/noticias', Controller.getNoticias);
router.post('/noticias', Controller.postNoticia);
router.delete('/noticias', Controller.deleteNoticia);
/* router.put('/noticias', upload.single('file'), Controller.putNoticia);
router.put('/noticiasWithoutFile', Controller.putNoticiaWithoutFile); */

// Rutas para la gestión de sesiones de usuarios
router.post('/login', Controller.login);
router.post('/session', authMiddleware, Controller.session);
router.post('/logout', authMiddleware, Controller.logout);

export default router;