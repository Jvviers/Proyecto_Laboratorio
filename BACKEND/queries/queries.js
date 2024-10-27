// Consultas para obtener datos de solicitudes
const getSolicitudes = "SELECT * FROM solicitud";
const getSolicitudesById = "SELECT * FROM solicitud WHERE ref_enc = ?";
const getEncargados = "SELECT DISTINCT id, email FROM usuario WHERE is_admin = 0";

// Consultas para el envío de solicitudes
const postAsesoria = "INSERT INTO solicitud (solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?)";
const postMateriales = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_proyecto, tipo_material, archivo, tipo_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const postEquipos = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_form) VALUES (?, ?, ?, ?, ?)";
const postEquipo = "INSERT INTO equipo (ref_sol, nombre_equipo) VALUES (?, ?)";

// Consultas para la gestión de solicitudes
const postEncargadoSolicitud = "UPDATE solicitud SET ref_enc = ? WHERE id = ?";
const postEstadoSolicitud = "UPDATE solicitud SET estado = ? WHERE id = ?";

// Consultas para obtener los mantenedores
const getNombreEquipos = "SELECT * FROM nombreequipos";
const getTipoMaterial = "SELECT * FROM tipomaterial";
const getTipoProyecto = "SELECT * FROM tipoproyecto";

// Consultas para agregar mantenedores
const postNombreEquipos = "INSERT INTO nombreequipos (nombre) VALUES (?)";
const postTipoMaterial = "INSERT INTO tipomaterial (nombre) VALUES (?)";
const postTipoProyecto = "INSERT INTO tipoproyecto (nombre) VALUES (?)";

// Consultas para eliminar mantenedores
const deleteNombreEquipos = "DELETE FROM nombreequipos WHERE id = ?";
const deleteTipoMaterial = "DELETE FROM tipomaterial WHERE id = ?";
const deleteTipoProyecto = "DELETE FROM tipoproyecto WHERE id = ?";

// Consultas para la gestión de sesiones de usuarios
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const getUserByEmail = "SELECT * FROM usuario WHERE email = ?";

export default {
    getSolicitudes,
    getSolicitudesById,
    getEncargados,
    postAsesoria,
    postMateriales,
    postEquipos,
    postEquipo,
    postEncargadoSolicitud,
    postEstadoSolicitud,
    getNombreEquipos,
    getTipoMaterial,
    getTipoProyecto,
    postNombreEquipos,
    postTipoMaterial,
    postTipoProyecto,
    deleteNombreEquipos,
    deleteTipoMaterial,
    deleteTipoProyecto,
    register,
    getUserByEmail,
}