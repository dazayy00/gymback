import { createMembershipService } from "../services/membership.service.js";
import prisma from "../config/prisma.js";

export const createMembership = async (req, res) => {
    try {
        const membership = await createMembershipService(req.body);

        res.status(201).json({
            message: "Membresia creada",
            data: membership,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message || "error al crear membresia",
        });
    }
};

export const getUserMemberships = async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        const memberships = await prisma.membership.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        res.json({ data: memberships });
    } catch (error) {
        console.error("GET MEMBERSHIPS ERROR:", error);
        res.status(500).json({ message: "Error al obtener membresías" });
    }
};