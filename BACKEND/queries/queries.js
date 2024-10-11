const getUsers = "select * from usuario"
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const postAsesoria = "INSERT INTO solicitud (solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?)";
const login = "SELECT * FROM usuario WHERE email = ? AND password = ?";
export default {
    getUsers,
    register,
    postAsesoria,
    login
}