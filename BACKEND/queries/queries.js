const getUsers = "select * from usuario"
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const postAsesoria = "INSERT INTO solicitud (ref_admin, solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?, ?)";

export default {
    getUsers,
    register,
    postAsesoria
}