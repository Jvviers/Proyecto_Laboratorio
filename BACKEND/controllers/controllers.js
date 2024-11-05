import Queries from "../queries/queries.js";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import data from "../config.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Controladores para obtener datos de solicitudes
const getSolicitudes = async (req, res) => {
  try {
    const [solicitudes] = await db.query(Queries.getSolicitudes);
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSolicitudesById = async (req, res) => {
  try {
    const [solicitudes] = await db.query(Queries.getSolicitudesById, [
      req.params.id,
    ]);
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEquipoById = async (req, res) => {
  try {
    const [equipo] = await db.query(Queries.getEquipoById, [req.params.id]);
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const downloadMaterial = async (req, res) => {
  try {
    const [result] = await db.query(Queries.downloadMaterial, [req.params.id]);
    if (result.length === 0)
      return res.status(404).send("Archivo no encontrado");
    const { nombre_archivo, archivo } = result[0];
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${nombre_archivo}`
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.end(archivo, "binary");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMailEncargado = async (req, res) => {
  try {
    const [encargado] = await db.query(Queries.getMailEncargado, [req.body.id]);
    res.json(encargado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para el envío de solicitudes
const postAsesoria = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postAsesoria, [
      req.body.solicitante,
      req.body.email,
      req.body.matricula,
      req.body.actividad,
      req.body.fecha,
      "asesoria",
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postMateriales = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No se ha subido ningún archivo.");
    const [data] = await db.query(Queries.postMateriales, [
      req.body.solicitante,
      req.body.email,
      req.body.matricula,
      req.body.actividad,
      req.body.tipo_proyecto,
      req.body.tipo_material,
      file.originalname,
      file.buffer,
      "impresion",
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postEquipos = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postEquipos, [
      req.body.solicitante,
      req.body.email,
      req.body.matricula,
      req.body.actividad,
      "laboratorio",
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postEquipo = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postEquipo, [
      req.body.ref_sol,
      req.body.nombre_equipo,
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para la gestión de solicitudes
const postEncargadoSolicitud = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postEncargadoSolicitud, [
      req.body.ref_enc,
      req.body.id,
    ]);
    const [email] = await db.query(Queries.getMailEncargado, [
      req.body.ref_enc,
    ]);

    console.log(req.body.ref_enc);
    await sendEmailNotification(
      email[0].email,
      "Asignación de solicitud",
      `Se le ha asignado la solicitud de: ${req.body.solicitante}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendEmailNotification = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    from: data.PUBLIC_MAIL_USER,
    auth: {
      user: data.PUBLIC_MAIL_USER,
      pass: data.PUBLIC_MAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h2 style="color: #ba0c2f; text-align: center;">${subject}</h2>
        <hr style="border: 1px solid #ba0c2f; margin: 20px 0;">
        <p style="font-size: 16px; color: #242424;">Estimado/a,</p>
        <p style="font-size: 16px; color: #242424; line-height: 1.5;">${text}</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <footer style="margin-top: 20px; font-size: 14px; color: #999; text-align: center;">
            <p style="margin: 5px 0;">Atentamente,</p>
            <p style="margin: 5px 0;">La Administración</p>
        </footer>
        <div style="margin-top: 20px; padding: 10px; background-color: #fff3cd; color: #856404; border: 1px solid #ffeeba; border-radius: 5px; text-align: center;">
            <strong>Advertencia:</strong> Este correo es autogenerado, por favor no responda a este mensaje.
        </div>
    </div>
`;


  try {
    await transporter.sendMail({
      from: "Administración Lab <utal.adm@gmail.com>",
      to: to,
      subject: subject,
      html: htmlContent, 
    });
    console.log("Email enviado");
  } catch (error) {
    console.log("Error al enviar email", error);
  }
};
const postEstadoSolicitud = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postEstadoSolicitud, [
      req.body.estado,
      req.body.id,
    ]);

    await sendEmailNotification(
      req.body.email,
      "Actualización de estado de solicitud",
      `El estado de tu solicitud cambió a ${req.body.estado}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSolicitud = async (req, res) => {
  try {
    const [data] = await db.query(Queries.deleteSolicitud, [req.body.id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para obtener los mantenedores
const getEncargados = async (req, res) => {
  try {
    const [idEncargados] = await db.query(Queries.getEncargados);
    res.json(idEncargados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNombreEquipos = async (req, res) => {
  try {
    const [nombreEquipos] = await db.query(Queries.getNombreEquipos);
    res.json(nombreEquipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTipoMaterial = async (req, res) => {
  try {
    const [tipoMaterial] = await db.query(Queries.getTipoMaterial);
    res.json(tipoMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTipoProyecto = async (req, res) => {
  try {
    const [tipoProyecto] = await db.query(Queries.getTipoProyecto);
    res.json(tipoProyecto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para agregar mantenedores
const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      data.SALT_ROUNDS
    );
    const [user] = await db.query(Queries.register, [
      req.body.email,
      hashedPassword,
      req.body.is_admin,
    ]);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postNombreEquipos = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postNombreEquipos, [req.body.nombre]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postTipoMaterial = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postTipoMaterial, [req.body.nombre]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const postTipoProyecto = async (req, res) => {
  try {
    const [data] = await db.query(Queries.postTipoProyecto, [req.body.nombre]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para eliminar mantenedores
const deleteEncargado = async (req, res) => {
  try {
    const [data] = await db.query(Queries.deleteEncargado, [req.body.id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteNombreEquipos = async (req, res) => {
  try {
    const [data] = await db.query(Queries.deleteNombreEquipos, [req.body.id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTipoMaterial = async (req, res) => {
  try {
    const [data] = await db.query(Queries.deleteTipoMaterial, [req.body.id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTipoProyecto = async (req, res) => {
  try {
    const [data] = await db.query(Queries.deleteTipoProyecto, [req.body.id]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para editar mantenedores
const putEncargado = async (req, res) => {
  try {
    const [data] = await db.query(Queries.putEncargado, [
      req.body.email,
      req.body.id,
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const putNombreEquipos = async (req, res) => {
  try {
    const [data] = await db.query(Queries.putNombreEquipos, [
      req.body.nombre,
      req.body.id,
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const putTipoMaterial = async (req, res) => {
  try {
    const [data] = await db.query(Queries.putTipoMaterial, [
      req.body.nombre,
      req.body.id,
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const putTipoProyecto = async (req, res) => {
  try {
    const [data] = await db.query(Queries.putTipoProyecto, [
      req.body.nombre,
      req.body.id,
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controladores para la gestión de sesiones de usuarios
const login = async (req, res) => {
  try {
    const [users] = await db.query(Queries.getUserByEmail, [req.body.email]);

    if (users.length === 0)
      return res.status(401).json({ message: "El usuario no existe" });

    const user = users[0];
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword)
      return res.status(401).json({ message: "La contraseña es incorrecta" });

    const role = user.is_admin ? "admin" : "encargado"; // Cambiar a 'admin' si el usuario es administrador

    const tokenPayload = {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
    };
    const accessToken = jwt.sign(tokenPayload, data.SECRET_JWT_KEY, {
      expiresIn: "16h",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600 * 1000 * 16,
    });
    res.send({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const session = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    is_admin: req.user.is_admin,
  });
};
const logout = (req, res) => {
  res.clearCookie("accessToken").json({ message: "Sesión cerrada" });
};

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
  login,
  session,
  logout,
};
