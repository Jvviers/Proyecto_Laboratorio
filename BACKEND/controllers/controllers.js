import Queries from '../queries/queries.js';
import db from '../db.js';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config.js';


const getUsers = async (req, res) => {
    const [users] = await db.query(Queries.getUsers);
    res.json(users);
}

const register = async (req, res) => {
    const hashedPassword = bcrypt.hash(req.body.password, SALT_ROUNDS);
    const [user] = await db.query(Queries.register, [req.body.email, hashedPassword, req.body.is_admin]);
    res.json(user);
}

const postAsesoria = async (req, res) => {
    const [user] = await db.query(Queries.postAsesoria, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
    res.json(user);
}

const login = async (req, res) => {
    const [user] = await db.query(Queries.login, [req.body.email, req.body.password]);
    res.json(user);
}

/* const isValid = await bcrypt.compare(password, user.password); */

export default {
    getUsers,
    register,
    postAsesoria,
    login
}