const adminMiddleware = (req, res, next) => {
    if (!req.user.is_admin) {
        return res.status(403).json({ error: 'No autorizado, solo administradores' });
    }
    next();
};

export default adminMiddleware;
