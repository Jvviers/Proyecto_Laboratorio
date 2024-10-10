const getUsers = "select * from usuario"
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";

export default {
    getUsers,
    register
}