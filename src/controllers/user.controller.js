import {
  createUserService,
  getUsersService,
} from "../services/user.service.js";
import QRCode from "qrcode";
import prisma from "../config/prisma.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      message: "Usuario creado correctamente",
      data: user,
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    res.status(500).json({
      message: "Error al crear usuario",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const { users, total } = await getUsersService({ skip, take: limit });

    res.status(200).json({
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      message: "Error al obtener usuarios",
    });
  }
};

export const getUserQr = async (req, res) => {
  try {
    const id   = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const buffer = await QRCode.toBuffer(user.qrCode, {
      width: 220,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("GET USER QR ERROR:", error);
    res.status(500).json({ message: "Error al generar QR" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone, status } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { name, email, phone, status },
    });

    res.json({ message: "Usuario actualizado", data: user });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // En lugar de borrar físico, cambiamos el status a INACTIVE
    const user = await prisma.user.update({
      where: { id },
      data: { status: "INACTIVE" },
    });

    res.json({ message: "Usuario desactivado", data: user });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};