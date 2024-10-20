import Queries from '../queries/queries.js';
import db from '../db.js';
import bcrypt from 'bcrypt';
import data from '../config.js';
import jwt from 'jsonwebtoken'


const getUsers = async (req, res) => {
    const [users] = await db.query(Queries.getUsers);
    res.json(users);
}

const register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, data.SALT_ROUNDS);
    const [user] = await db.query(Queries.register, [req.body.email, hashedPassword, req.body.is_admin]);
    res.json(user);
}

const postAsesoria = async (req, res) => {
    const [user] = await db.query(Queries.postAsesoria, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.fecha, "asesoria"]);
    res.json(user);
}

const postMateriales = async (req, res) => {
    const [user] = await db.query(Queries.postMateriales, [req.body.solicitante, req.body.email, req.body.matricula, req.body.actividad, req.body.tipo_proyecto, req.body.tipo_material, null, "impresion"]);
    res.json(user);
}

/*
Usé bcrypt para la comparación de contraseñas y 
JWT para luego generar un token de sesión.
*/
const login = async (req, res) => {
    console.log('logeado');
    const [user] = await db.query(Queries.login, [req.body.email]);
    
    if (user.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const users = user[0]; //el usuario encontrado! UNIQUE :-D
    const isValidPassword = await bcrypt.compare(req.body.password, users.password);


    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: users.email, id: users.id }, data.SECRET_JWT_KEY, { expiresIn: '1h' });
    res.send({user, token});

    res.cookie('access_token', token, {
        httpOnly: true,  // Para prevenir acceso desde JavaScript (mayor seguridad contra XSS)
        secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS en producción
        sameSite: 'Strict',  // Protección adicional contra CSRF //cambiar a none para no tener problemas 
        maxAge: 60 * 60 * 1000// 5 minutos 
    });

    res.json({ 
        message: "Inicio de sesión exitoso", 
        user: { 
            id: users.id, 
            email: users.email, 
            is_admin: users.is_admin 
        }
    });
}

const logout = (req, res) => {
    // Eliminar la cookie 'access_token'
    res.clearCookie('access_token').json({ message: 'Logout successful' });
};





export default {
    getUsers,
    register,
    postAsesoria,
    postMateriales,
    login,
    logout,
}