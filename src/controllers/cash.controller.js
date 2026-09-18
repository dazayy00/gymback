import prisma from "../config/prisma.js";

export const getCashStatus = async (req, res) => {
  try {
    const session = await prisma.cashRegisterSession.findFirst({
      where: { status: "OPEN" },
      orderBy: { openedAt: "desc" },
    });

    res.json({ data: session || null });
  } catch (error) {
    console.error("GET CASH STATUS ERROR:", error);
    res.status(500).json({ message: "Error al verificar caja" });
  }
};

export const openCash = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { startingBalance } = req.body;

    const existing = await prisma.cashRegisterSession.findFirst({
      where: { status: "OPEN" },
    });

    if (existing) {
      return res.status(400).json({ message: "Ya hay una caja abierta" });
    }

    const session = await prisma.cashRegisterSession.create({
      data: {
        openedById: adminId,
        startingBalance: Number(startingBalance) || 0,
      },
    });

    res.status(201).json({ message: "Caja abierta", data: session });
  } catch (error) {
    console.error("OPEN CASH ERROR:", error);
    res.status(500).json({ message: "Error al abrir caja" });
  }
};

export const closeCash = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { closingBalance } = req.body;

    const session = await prisma.cashRegisterSession.findFirst({
      where: { status: "OPEN" },
      orderBy: { openedAt: "desc" },
    });

    if (!session) {
      return res.status(400).json({ message: "No hay ninguna caja abierta" });
    }

    const updated = await prisma.cashRegisterSession.update({
      where: { id: session.id },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
        closedById: adminId,
        closingBalance: Number(closingBalance) || 0,
      },
    });

    res.json({ message: "Caja cerrada", data: updated });
  } catch (error) {
    console.error("CLOSE CASH ERROR:", error);
    res.status(500).json({ message: "Error al cerrar caja" });
  }
};
