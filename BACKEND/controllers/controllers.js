import Queries from '../queries/queries.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';
import data from '../config.js';
import jwt from 'jsonwebtoken'

// Controladores para obtener datos de solicitudes
const getSolicitudes = async (req, res) => {
    try {
        const [solicitudes] = await db.query(Queries.getSolicitudes);
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
const getSolicitudesById = async (req, res) => {
    try {
        const [solicitudes] = await db.query(Queries.getSolicitudesById, [req.params.id]);
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
const getEncargados = async (req, res) => {
    try {
        const [idEncargados] = await db.query(Queries.getEncargados);
        res.json(idEncargados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para el envío de solicitudes
const postAsesoria = async (req, res) => {
    const [data] = await db.query(Queries.postAsesoria, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
    res.json(data);
}
const postMateriales = async (req, res) => {
    const [data] = await db.query(Queries.postMateriales, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.tipo_proyecto, req.body.tipo_material, req.body.archivo, "impresion"]);
    res.json(data);
}
const postEquipos = async (req, res) => {
    const [data] = await db.query(Queries.postEquipos, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, "laboratorio"]);
    res.json(data);
}
const postEquipo = async (req, res) => {
    const [data] = await db.query(Queries.postEquipo, [req.body.ref_sol, req.body.nombre_equipo]);
    res.json(data);
}

// Controladores para la gestión de solicitudes
const postEncargadoSolicitud = async (req, res) => {
    const [data] = await db.query(Queries.postEncargadoSolicitud, [req.body.ref_enc, req.body.id]);
    res.json(data);
}
const postEstadoSolicitud = async (req, res) => {
    const [data] = await db.query(Queries.postEstadoSolicitud, [req.body.estado, req.body.id]);
    res.json(data);
}

// Controladores para la gestión de sesiones de usuarios
const register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, data.SALT_ROUNDS);
    const [user] = await db.query(Queries.register, [req.body.email, hashedPassword, req.body.is_admin]);
    res.json(user);
}
const login = async (req, res) => {
    const [users] = await db.query(Queries.getUserByEmail, [req.body.email]);
    
    if (users.length === 0) return res.status(401).json({ message: "El usuario no existe" });
    
    const user = users[0];
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) return res.status(401).json({ message: "La contraseña no es válida" });
    
    const tokenPayload = { id: user.id, email: user.email, is_admin: user.is_admin };
    const accessToken = jwt.sign(tokenPayload, data.SECRET_JWT_KEY, { expiresIn: '16h' });
    
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 3600 * 1000 * 16,
    });
    res.send({ email:user.email });
}
const session = (req, res) => {
    res.json({ id: req.user.id, email: req.user.email, is_admin: req.user.is_admin });
}
const logout = (req, res) => {
    res.clearCookie('accessToken').json({ message: 'Sesión cerrada' });
}

export default {
    getSolicitudes,
    getSolicitudesById,
    getEncargados,
    postAsesoria,
    postMateriales,
    postEquipos,
    postEquipo,
    postEncargadoSolicitud,
    postEstadoSolicitud,
    register,
    login,
    session,
    logout,
}