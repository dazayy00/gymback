import prisma from "../config/prisma.js";

export const getGymSettings = async (req, res) => {
  try {
    const gym = await prisma.gym.findUnique({ where: { id: 1 } });
    if (!gym) {
      const newGym = await prisma.gym.create({
        data: { name: "Mi Gimnasio" },
      });
      return res.json({ data: newGym });
    }
    res.json({ data: gym });
  } catch (error) {
    console.error("GET GYM SETTINGS ERROR:", error);
    res.status(500).json({ message: "Error al obtener configuración" });
  }
};

export const updateGymSettings = async (req, res) => {
  try {
    const { name, logoUrl, primaryColor } = req.body;
    
    const gym = await prisma.gym.upsert({
      where: { id: 1 },
      update: { name, logoUrl, primaryColor },
      create: { name: name || "Mi Gimnasio", logoUrl, primaryColor },
    });

    res.json({ message: "Configuración actualizada", data: gym });
  } catch (error) {
    console.error("UPDATE GYM SETTINGS ERROR:", error);
    res.status(500).json({ message: "Error al actualizar configuración" });
  }
};
