const getUsers = "SELECT * FROM usuario"
const getUserByEmail = "SELECT * FROM usuario WHERE email = ?";
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const postAsesoria = "INSERT INTO solicitud (solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?)";
const postMateriales = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_proyecto, tipo_material, archivo, tipo_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const postEquipos = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_form) VALUES (?, ?, ?, ?, ?)";
const postEquipo = "INSERT INTO equipo (ref_sol, nombre_equipo) VALUES (?, ?)";
const getSolicitudes = "SELECT * FROM solicitud";
const getSolicitudesById = "SELECT * FROM solicitud WHERE ref_enc = ?";
const getAllIdEncargados = "SELECT DISTINCT id FROM usuario WHERE is_admin = 0";

export default {
    getUsers,
    getUserByEmail,
    register,
    postAsesoria,
    postMateriales,
    postEquipos,
    postEquipo,
    getSolicitudes,
    getSolicitudesById,
    getAllIdEncargados,
}