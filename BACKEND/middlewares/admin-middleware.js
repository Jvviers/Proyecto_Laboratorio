// adminMiddleware.js
import jwt from 'jsonwebtoken';
import data from '../config.js';

const adminMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const secret = data.SECRET_JWT_KEY;

    if (!accessToken) return res.status(403).send("Acceso denegado");

    try {
        const user = jwt.verify(accessToken, secret);
        if (!user.is_admin) {
            // Verificar si el usuario es administrador
            return res.status(403).send("Acceso denegado, no eres administrador");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send("Acceso denegado, o sesión inválida");
    }
};

export default adminMiddleware;
