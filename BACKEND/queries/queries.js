const getUsers = "SELECT * FROM usuario"
const getUserByEmail = "SELECT * FROM usuario WHERE email = ?";
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const postAsesoria = "INSERT INTO solicitud (solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?)";
const postMateriales = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_proyecto, tipo_material, archivo, tipo_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

export default {
    getUsers,
    getUserByEmail,
    register,
    postAsesoria,
    postMateriales
}