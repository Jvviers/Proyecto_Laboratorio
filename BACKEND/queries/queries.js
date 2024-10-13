const getUsers = "select * from usuario"
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const postAsesoria = "INSERT INTO solicitud (solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?)";

/*
Usando bcrypt las contraseñas no se guardan en texto plano, sino como un hash seguro. O sea que... 
la contra ya ingresada no se compara directamente con el valor de la contra en la BD porque 
el hash es diferente cada vez que se genera, incluso para la misma contra.

Por ejemplo:

Contraseña original: "123456"
Hash 1: $2b$10$3452435
Hash 2: $2b$10$4562y6//&(/)
*/

const login = "SELECT * FROM usuario WHERE email = ?";

export default {
    getUsers,
    register,
    postAsesoria,
    login
}