import prisma from "../config/prisma.js";

export const createMembershipService = async (data) => {
    const { userId, type } = data;

    const startDate = new Date();
    let endDate = new Date();

    switch (type){
        case "DAILY":
            endDate.setDate(startDate.getDate() + 1);
            break;
        case "WEEKLY":
            endDate.setDate(startDate.getDate() + 7);
            break;
        case "MONTHLY":
            endDate.setMonth(startDate.getMonth() + 1);
            break;
        case "YEARLY":
            endDate.setFullYear(startDate.getFullYear() + 1);
            break;
        default:
            throw new Error("Tipo de membresia invalida");
    }

    const membership = await prisma.membership.create({
        data: {
            userId,
            type,
            startDate,
            endDate,
            status: "ACTIVE",
        },
    });

    return membership;
};