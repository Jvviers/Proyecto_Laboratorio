import { Router } from 'express';
import Controller from '../controllers/controllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Rutas para obtener datos de solicitudes
router.get('/solicitudes', authMiddleware, Controller.getSolicitudes);
router.get('/solicitudes/:id', authMiddleware, Controller.getSolicitudesById);
router.get('/encargados', authMiddleware, Controller.getEncargados);


// Rutas para el envío de solicitudes
router.post('/asesoria', Controller.postAsesoria);
router.post('/materiales', Controller.postMateriales);
router.post('/equipos', Controller.postEquipos);
router.post('/equipo', Controller.postEquipo);

// Rutas para la gestión de solicitudes
router.post('/encargado-solicitud', authMiddleware, Controller.postEncargadoSolicitud);
router.post('/estado-solicitud', authMiddleware, Controller.postEstadoSolicitud);

// Rutas para obtener los mantenedores
router.get('/nombre-equipos', Controller.getNombreEquipos);
router.get('/tipo-material', Controller.getTipoMaterial);
router.get('/tipo-proyecto', Controller.getTipoProyecto);

// Rutas para agregar mantenedores
router.post('/nombre-equipos', Controller.postNombreEquipos);
router.post('/tipo-material', Controller.postTipoMaterial);
router.post('/tipo-proyecto', Controller.postTipoProyecto);

// Rutas para eliminar mantenedores
router.delete('/nombre-equipos', Controller.deleteNombreEquipos);
router.delete('/tipo-material', Controller.deleteTipoMaterial);
router.delete('/tipo-proyecto', Controller.deleteTipoProyecto);

// Rutas para la gestión de sesiones de usuarios
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/session', authMiddleware, Controller.session);
router.post('/logout', authMiddleware, Controller.logout);

export default router;