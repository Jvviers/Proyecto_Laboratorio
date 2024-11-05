// Consultas para obtener datos de solicitudes
const getSolicitudes = "SELECT * FROM solicitud";
const getSolicitudesById = "SELECT * FROM solicitud WHERE ref_enc = ?";
const getEquipoById = "SELECT * FROM equipo WHERE ref_sol = ?";
const downloadMaterial = "SELECT nombre_archivo, contenido_archivo FROM solicitud WHERE id = ?";
const getMailEncargado = "SELECT email FROM usuario WHERE id = ?";

// Consultas para el envío de solicitudes
const postAsesoria = "INSERT INTO solicitud (solicitante, email, matricula, actividad, fecha, tipo_form) VALUES (?, ?, ?, ?, ?, ?)";
const postMateriales = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_proyecto, tipo_material, nombre_archivo, contenido_archivo, tipo_form) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
const postEquipos = "INSERT INTO solicitud (solicitante, email, matricula, actividad, tipo_form) VALUES (?, ?, ?, ?, ?)";
const postEquipo = "INSERT INTO equipo (ref_sol, nombre_equipo) VALUES (?, ?)";

// Consultas para la gestión de solicitudes
const postEncargadoSolicitud = "UPDATE solicitud SET ref_enc = ? WHERE id = ?";
const postEstadoSolicitud = "UPDATE solicitud SET estado = ? WHERE id = ?";
const deleteSolicitud = "DELETE FROM solicitud WHERE id = ?";

// Consultas para obtener los mantenedores
const getEncargados = "SELECT DISTINCT id, email FROM usuario WHERE is_admin = 0";
const getNombreEquipos = "SELECT * FROM nombreequipos";
const getTipoMaterial = "SELECT * FROM tipomaterial";
const getTipoProyecto = "SELECT * FROM tipoproyecto";

// Consultas para agregar mantenedores
const register = "INSERT INTO usuario (email, password, is_admin) VALUES (?, ?, ?)";
const postNombreEquipos = "INSERT INTO nombreequipos (nombre) VALUES (?)";
const postTipoMaterial = "INSERT INTO tipomaterial (nombre) VALUES (?)";
const postTipoProyecto = "INSERT INTO tipoproyecto (nombre) VALUES (?)";

// Consultas para eliminar mantenedores
const deleteEncargado = "DELETE FROM usuario WHERE id = ?";
const deleteNombreEquipos = "DELETE FROM nombreequipos WHERE id = ?";
const deleteTipoMaterial = "DELETE FROM tipomaterial WHERE id = ?";
const deleteTipoProyecto = "DELETE FROM tipoproyecto WHERE id = ?";

// Consultas para editar mantenedores
const putEncargado = "UPDATE usuario SET email = ? WHERE id = ?";
const putNombreEquipos = "UPDATE nombreequipos SET nombre = ? WHERE id = ?";
const putTipoMaterial = "UPDATE tipomaterial SET nombre = ? WHERE id = ?";
const putTipoProyecto = "UPDATE tipoproyecto SET nombre = ? WHERE id = ?";

// Consultas para la gestión de imagenes del carrusel
const getCarrusel = "SELECT * FROM imagencarrusel";
const postCarrusel = "INSERT INTO imagencarrusel (id, url) VALUES (?, ?)";
const deleteCarrusel = "DELETE FROM imagencarrusel WHERE id = ?";

// Consultas para noticias
const getNoticias = "SELECT * FROM noticia";
const postNoticia = "INSERT INTO noticia (titulo, descripcion, url, public_id) VALUES (?, ?, ?, ?)";
const deleteNoticia = "DELETE FROM noticia WHERE id = ?";
const putNoticia = "UPDATE noticia SET titulo = ?, descripcion = ?, nombre_archivo = ?, contenido_archivo = ? WHERE id = ?";
const putNoticiaWithoutFile = "UPDATE noticia SET titulo = ?, descripcion = ? WHERE id = ?";

// Consultas para la gestión de sesiones de usuarios
const getUserByEmail = "SELECT * FROM usuario WHERE email = ?";

export default {
    getSolicitudes,
    getSolicitudesById,
    getEquipoById,
    downloadMaterial,
    getMailEncargado,
    postAsesoria,
    postMateriales,
    postEquipos,
    postEquipo,
    postEncargadoSolicitud,
    postEstadoSolicitud,
    deleteSolicitud,
    getEncargados,
    getNombreEquipos,
    getTipoMaterial,
    getTipoProyecto,
    register,
    postNombreEquipos,
    postTipoMaterial,
    postTipoProyecto,
    deleteEncargado,
    deleteNombreEquipos,
    deleteTipoMaterial,
    deleteTipoProyecto,
    putEncargado,
    putNombreEquipos,
    putTipoMaterial,
    putTipoProyecto,
    getCarrusel,
    postCarrusel,
    deleteCarrusel,
    getNoticias,
    postNoticia,
    deleteNoticia,
    putNoticia,
    putNoticiaWithoutFile,
    getUserByEmail,
}