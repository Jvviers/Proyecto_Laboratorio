import Queries from '../queries/queries.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import data from '../config.js';
import jwt from 'jsonwebtoken'
import sseController from './sseController.js';

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
const downloadMaterial = async (req, res) => {
    try {
        const [result] = await db.query(Queries.downloadMaterial, [req.params.id]);
        if (result.length === 0) return res.status(404).send('Archivo no encontrado');
        const { nombre_archivo, contenido_archivo } = result[0];
        res.setHeader('Content-Disposition', `attachment; filename=${nombre_archivo}`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.end(contenido_archivo, 'binary');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para el envío de solicitudes
const postAsesoria = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postAsesoria, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update solicitudes' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postMateriales = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send('No se ha subido ningún archivo.');
        const [data] = await db.query(Queries.postMateriales, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.tipo_proyecto, req.body.tipo_material, file.originalname, file.buffer, "impresion"]);
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update solicitudes' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postEquipos = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postEquipos, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, "laboratorio"]);
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update solicitudes' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postEquipo = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postEquipo, [req.body.ref_sol, req.body.nombre_equipo]);
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update solicitudes' });
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
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update encargados' });
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
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update encargados' });
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
        sseController.sendEventsToAll({ type: 'UPDATE', message: 'Update encargados' });
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

// Controladores para la gestión de imagenes del carrusel
const getCarrusel = async (req, res) => {
    try {
        const [data] = await db.query(Queries.getCarrusel);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postCarrusel = async (req, res) => {
    try {
        const [data] = await db.query(Queries.postCarrusel, [req.body.id, req.body.url]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteCarrusel = async (req, res) => {
    const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUDNAME;
    const apiKey = process.env.PUBLIC_CLOUDINARY_APIKEY;
    const apiSecret = process.env.PUBLIC_CLOUDINARY_APISECRET;

    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `public_id=${req.body.id}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    const formData = new URLSearchParams();
    formData.append('public_id', req.body.id);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.result === 'ok') {
            const [data] = await db.query(Queries.deleteCarrusel, [req.body.id]);
            res.json(data);
        } else {
            res.status(500).json({ message: 'Error al eliminar la imagen en la nube' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Controladores para noticias
const getNoticias = async (req, res) => {
    try {
        const [noticias] = await db.query(Queries.getNoticias);
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const postNoticia = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send('No se ha subido ningún archivo.');
        const [data] = await db.query(Queries.postNoticia, [req.body.title, req.body.description, file.originalname, file.buffer]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteNoticia = async (req, res) => {
    try {
        const [data] = await db.query(Queries.deleteNoticia, [req.body.id]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const putNoticia = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send('No se ha subido ningún archivo.');
        const [data] = await db.query(Queries.putNoticia, [req.body.id, req.body.title, req.body.description, file.originalname, file.buffer]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
const putNoticiaWithoutFile = async (req, res) => {
    try {
        const [data] = await db.query(Queries.putNoticiaWithoutFile, [req.body.id, req.body.title, req.body.description]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error });
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
    downloadMaterial,
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
    getCarrusel,
    postCarrusel,
    deleteCarrusel,
    getNoticias,
    postNoticia,
    deleteNoticia,
    putNoticia,
    putNoticiaWithoutFile,
    login,
    session,
    logout,
}