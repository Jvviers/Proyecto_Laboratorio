import jwt from 'jsonwebtoken';
import data from '../config.js';

const roleMiddleware = (rolesPermitidos) => (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const secret = data.SECRET_JWT_KEY;

    if (!accessToken) return res.status(403).send("Acceso denegado");

    try {
        const user = jwt.verify(accessToken, secret);

        // Verificar si el rol del usuario está en los roles permitidos
        if (!rolesPermitidos.includes(user.role)) {
            return res.status(403).send("Acceso denegado, rol no autorizado");
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send("Acceso denegado, o sesión inválida");
    }
};

export default roleMiddleware;
