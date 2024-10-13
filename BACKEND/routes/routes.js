import { Router } from 'express';
import Controller from '../controllers/controllers.js';
import authMiddleware from '../gestion-sesion.js';
import adminMiddleware from '../admin-middleware.js';

const router = Router();
 //las rutas que protegí son aquellas que requerían autenticación como la solicitud de asesoría y funciones administrativas
router.get('/users',authMiddleware, Controller.getUsers); //protegido
router.post('/register', Controller.register);//no protegido
router.post('/asesoria',authMiddleware, Controller.postAsesoria);//protegido
router.post('/login', Controller.login);//no protegido
router.post('/admin/admin-middleware',authMiddleware, adminMiddleware, Controller.getUsers);/*aca tengo un error que según gpt al lado de '/admin/deberia-agregar-algo-mas-que-no-se-que-es xd' podria ser admin-middleware? xd*/
router.post('/logout', Controller.logout);

export default router;