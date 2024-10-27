import jwt from 'jsonwebtoken'
import data from '../config.js';

// Middleware para verificar si la sesión está activa
const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const secret = data.SECRET_JWT_KEY;

    if (!accessToken) return res.status(403).send("Acceso denegado");
    
    try {
        const user = jwt.verify(accessToken, secret);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send("Acceso denegado, o sesión inválida");
    }
}

export default authMiddleware;