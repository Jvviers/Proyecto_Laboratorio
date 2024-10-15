import { Router } from 'express';
import Controller from '../controllers/controllers.js';
import authMiddleware from '../gestion-sesion.js';
import adminMiddleware from '../admin-middleware.js';

const router = Router();
 //las rutas que protegí son aquellas que requerían autenticación como la solicitud de asesoría y funciones administrativas
router.get('/users', Controller.getUsers); //protegido
router.post('/register', Controller.register);//no protegido
router.post('/asesoria', Controller.postAsesoria);//protegido
router.post('/materiales', Controller.postMateriales);//protegido
router.post('/login', Controller.login);//no protegido
router.post('/admin/admin-middleware',authMiddleware, adminMiddleware, Controller.getUsers);
router.post('/logout', Controller.logout);
export default router;