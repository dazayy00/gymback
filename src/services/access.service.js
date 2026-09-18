import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const validateAccessService = async (token) => {
  // 1. Verificar que el token QR sea un JWT válido
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return {
      success: false,
      message: "QR inválido o expirado",
    };
  }

  // 2. Buscar el usuario por su qrCode en la DB
  const user = await prisma.user.findUnique({
    where: { qrCode: token },
    include: {
      memberships: {
        where: {
          status: "ACTIVE",
          endDate: { gt: new Date() },
        },
        orderBy: { endDate: "desc" },
        take: 1,
      },
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Usuario no encontrado",
    };
  }

  // 3. Verificar que el usuario esté activo
  if (user.status !== "ACTIVE") {
    await prisma.accessLog.create({
      data: {
        userId: user.id,
        success: false,
        message: "Usuario inactivo",
      },
    });

    return {
      success: false,
      message: "Usuario inactivo",
      user: { name: user.name },
    };
  }

  // 4. Verificar membresía activa
  const activeMembership = user.memberships[0];

  if (!activeMembership) {
    await prisma.accessLog.create({
      data: {
        userId: user.id,
        success: false,
        message: "Sin membresía activa",
      },
    });

    return {
      success: false,
      message: "Sin membresía activa",
      user: { name: user.name },
    };
  }

  // 5. Acceso concedido — registrar log
  await prisma.accessLog.create({
    data: {
      userId: user.id,
      success: true,
      message: "Acceso concedido",
    },
  });

  return {
    success: true,
    message: `¡Bienvenido, ${user.name}!`,
    user: {
      name: user.name,
      imageUrl: user.imageUrl,
      membershipType: activeMembership.type,
      membershipEndDate: activeMembership.endDate,
    },
  };
};
