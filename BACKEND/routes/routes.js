import { Router } from 'express';
import Controller from '../controllers/controllers.js';
import authMiddleware from '../middlewares/gestion-sesion.js';
import adminMiddleware from '../middlewares/admin-middleware.js';

const router = Router();

router.get('/users', authMiddleware, Controller.getUsers);
router.post('/asesoria', Controller.postAsesoria);
router.post('/materiales', Controller.postMateriales);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/logout', authMiddleware, Controller.logout);

export default router;