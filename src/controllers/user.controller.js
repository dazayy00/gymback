import {
  createUserService,
  getUsersService,
} from "../services/user.service.js";

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
    const users = await getUsersService();

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      message: "Error al obtener usuarios",
    });
  }
};