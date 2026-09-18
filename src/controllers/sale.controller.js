import { createSaleService } from "../services/sale.service.js";
import prisma from "../config/prisma.js";

export const createSale = async (req, res) => {
  try {
    const { userId, items, paymentMethod } = req.body;
    const adminId = req.admin?.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Datos incompletos",
      });
    }

    const sale = await createSaleService({ userId, adminId, paymentMethod, items });

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const sales = await prisma.sale.findMany({
      skip,
      take: limit,
      include: {
        user: true,
        admin: true,
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

    const total = await prisma.sale.count();

    res.json({
      data: sales,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("ERROR GET SALES:", error);

    res.status(500).json({
      message: "Error al obtener ventas",
    });
  }
};