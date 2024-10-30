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
const getEquipoById = async (req, res) => {
    try {
        const [equipo] = await db.query(Queries.getEquipoById, [req.params.id]);
        res.json(equipo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para el envío de solicitudes
const postAsesoria = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postAsesoria, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postMateriales = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postMateriales, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.tipo_proyecto, req.body.tipo_material, req.body.archivo, "impresion"]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postEquipos = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postEquipos, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, "laboratorio"]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postEquipo = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postEquipo, [req.body.ref_sol, req.body.nombre_equipo]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para la gestión de solicitudes
const postEncargadoSolicitud = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postEncargadoSolicitud, [req.body.ref_enc, req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postEstadoSolicitud = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postEstadoSolicitud, [req.body.estado, req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteSolicitud = async (req, res) => {
    try {
        const [data] = await db.query(Queries.deleteSolicitud, [req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para obtener los mantenedores
const getEncargados = async (req, res) => {
    try {
        const [idEncargados] = await db.query(Queries.getEncargados);
        res.json(idEncargados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getNombreEquipos = async (req, res) => {
    try {
        const [nombreEquipos] = await db.query(Queries.getNombreEquipos);
        res.json(nombreEquipos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getTipoMaterial = async (req, res) => {
    try {
        const [tipoMaterial] = await db.query(Queries.getTipoMaterial);
        res.json(tipoMaterial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getTipoProyecto = async (req, res) => {
    try {
        const [tipoProyecto] = await db.query(Queries.getTipoProyecto);
        res.json(tipoProyecto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para agregar mantenedores
const register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, data.SALT_ROUNDS);
        const [user] = await db.query(Queries.register, [req.body.email, hashedPassword, req.body.is_admin]);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postNombreEquipos = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postNombreEquipos, [req.body.nombre]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postTipoMaterial = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postTipoMaterial, [req.body.nombre]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postTipoProyecto = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postTipoProyecto, [req.body.nombre]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para eliminar mantenedores
const deleteEncargado = async (req, res) => {
    try {
        const [data] = await db.query(Queries.deleteEncargado, [req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteNombreEquipos = async (req, res) => {
    try {
        const [data] = await db.query(Queries.deleteNombreEquipos, [req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteTipoMaterial = async (req, res) => {
    try {
        const [data] = await db.query(Queries.deleteTipoMaterial, [req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteTipoProyecto = async (req, res) => {
    try {
        const [data] = await db.query(Queries.deleteTipoProyecto, [req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para editar mantenedores
const putEncargado = async (req, res) => {
    try {
        const [data] = await db.query(Queries.putEncargado, [req.body.email, req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const putNombreEquipos = async (req, res) => {
    try {
        const [data] = await db.query(Queries.putNombreEquipos, [req.body.nombre, req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const putTipoMaterial = async (req, res) => {
    try {
        const [data] = await db.query(Queries.putTipoMaterial, [req.body.nombre, req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const putTipoProyecto = async (req, res) => {
    try {
        const [data] = await db.query(Queries.putTipoProyecto, [req.body.nombre, req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para la gestión de sesiones de usuarios
const login = async (req, res) => {
    try {
        const [users] = await db.query(Queries.getUserByEmail, [req.body.email]);

        if (users.length === 0) return res.status(401).json({ message: "El usuario no existe" });

        const user = users[0];
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) return res.status(401).json({ message: "La contraseña es incorrecta" });
    
    const role = user.is_admin ? 'admin' : 'encargado'; // Cambiar a 'admin' si el usuario es administrador

        const tokenPayload = { id: user.id, email: user.email, is_admin: user.is_admin };
        const accessToken = jwt.sign(tokenPayload, data.SECRET_JWT_KEY, { expiresIn: '16h' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600 * 1000 * 16,
        });
        res.send({ email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
    getEquipoById,
    postAsesoria,
    postMateriales,
    postEquipos,
    postEquipo,
    postEncargadoSolicitud,
    postEstadoSolicitud,
    deleteSolicitud,
    getEncargados,
    getNombreEquipos,
    getTipoMaterial,
    getTipoProyecto,
    register,
    postNombreEquipos,
    postTipoMaterial,
    postTipoProyecto,
    deleteEncargado,
    deleteNombreEquipos,
    deleteTipoMaterial,
    deleteTipoProyecto,
    putEncargado,
    putNombreEquipos,
    putTipoMaterial,
    putTipoProyecto,
    login,
    session,
    logout,
}