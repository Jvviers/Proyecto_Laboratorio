import Queries from '../queries/queries.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';
import data from '../config.js';
import jwt from 'jsonwebtoken'

const getUsers = async (req, res) => {
    const [users] = await db.query(Queries.getUsers);
    res.json(users);
}
const getSolicitudes = async (req, res) => {
    try {
        const [solicitudes] = await db.query(Queries.getSolicitudes);
        res.json(solicitudes);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }   
}


const postAsesoria = async (req, res) => {
    const [user] = await db.query(Queries.postAsesoria, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
    res.json(user);
}

const postMateriales = async (req, res) => {
    const [user] = await db.query(Queries.postMateriales, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.tipo_proyecto, req.body.tipo_material, req.body.archivo, "impresion"]);
    res.json(user);
}
/*
const postEquipos = async (req, res) => {
    const [user] = await db.query(Queries.postEquipos, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.equipos, "equipos"]);
    res.json(user);
}*/

const register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, data.SALT_ROUNDS);
    const [user] = await db.query(Queries.register, [req.body.email, hashedPassword, req.body.is_admin]);
    res.json(user);
}

const login = async (req, res) => {

    const { email, password } = req.body;
    const [users] = await db.query(Queries.getUserByEmail, [email]);
    
    if (users.length === 0) return res.status(401).json({ message: "El usuario no existe" });
    
    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(401).json({ message: "La contraseña no es válida" });
    
    const tokenPayload = { id: user.id, email: user.email, is_admin: user.is_admin };
    const accessToken = jwt.sign(tokenPayload, data.SECRET_JWT_KEY, { expiresIn: '5m' });
    
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        maxAge: 5 * 60 * 1000,
    });
    res.send({ email:user.email });
}

const logout = (req, res) => {
    // Eliminar la cookie 'access_token'
    res.clearCookie('accessToken').json({ message: 'Sesión cerrada' });
};

export default {
    getUsers,
    getSolicitudes,
    postAsesoria,
    postMateriales,
    //postEquipos,
    register,
    login,
    logout
}