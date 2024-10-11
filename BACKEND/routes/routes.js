import { Router } from 'express';
import Controller from '../controllers/controllers.js';

const router = Router();

router.get('/users', Controller.getUsers);
router.post('/register', Controller.register);
router.post('/asesoria', Controller.postAsesoria);

export default router;