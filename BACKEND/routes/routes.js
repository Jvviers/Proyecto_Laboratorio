import { Router } from 'express';
import Controller from '../controllers/controllers.js';
import authMiddleware from '../middlewares/gestion-sesion.js';
import adminMiddleware from '../middlewares/admin-middleware.js';

const router = Router();
router.get('/admin', adminMiddleware, (req, res) => {
    res.send("Acceso autorizado solo para administradores");
});
router.get('/users', authMiddleware, Controller.getUsers);
router.get('/solicitudes', Controller.getSolicitudes);
router.get('/solicitudes/:id', Controller.getSolicitudesById);
router.get('/allIdEncargados', Controller.getAllIdEncargados);
router.post('/asesoria', Controller.postAsesoria);
router.post('/materiales', Controller.postMateriales);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/session', authMiddleware, Controller.session);
/* router.post('/logout', authMiddleware, Controller.logout); */
router.post('/equipos', Controller.postEquipos);
router.post('/equipo', Controller.postEquipo);

export default router;