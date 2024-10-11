import Queries from '../queries/queries.js';
import db from '../db.js';

const getUsers = async (req, res) => {
    const [users] = await db.query(Queries.getUsers);
    res.json(users);
}

const register = async (req, res) => {
    const [user] = await db.query(Queries.register, [req.body.email, req.body.password, req.body.is_admin]);
    res.json(user);
}

const postAsesoria = async (req, res) => {
    const [user] = await db.query(Queries.postAsesoria, [req.body.ref_admin, req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
    res.json(user);
}

export default {
    getUsers,
    register,
    postAsesoria
}