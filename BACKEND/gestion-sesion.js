import jwt from 'jsonwebtoken'
import data from './config.js';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, data.SECRET_JWT_KEY);
        req.user = decoded; // Agregamos los datos del usuario al request
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

export default authMiddleware;
