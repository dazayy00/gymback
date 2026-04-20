import { createSaleService } from "../services/sale.service.js";
import prisma from "../config/prisma.js";

export const createSale = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        message: "Datos incompletos",
      });
    }

    const sale = await createSaleService({ userId, items });

    res.status(201).json({
      message: "Venta registrada",
      data: sale,
    });
  } catch (error) {
    console.error("ERROR CREATE SALE:", error);

    res.status(500).json({
      message: "Error en venta",
    });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        user: true,
        details: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(sales);
  } catch (error) {
    console.error("ERROR GET SALES:", error);

    res.status(500).json({
      message: "Error al obtener ventas",
    });
  }
};