import { Router } from 'express';
import Controller from '../controllers/controllers.js';

const router = Router();

router.get('/users', Controller.getUsers);

/* app.post('/login', (req, res) => {});
app.post('/logout', (req, res) => {});
app.get('/protected', (req, res) => {}); */

export default router;