import prisma from "../config/prisma.js";

export const createMembershipService = async (data) => {
    const { userId, type } = data;

    const now = new Date();

    const activeMembership = await prisma.membership.findFirst({
        where: {
            userId,
            status: "ACTIVE",
            endDate: {
                gt: now,
            },
        },
    });

    const calculateEndDate = (start, type) => {
        const end = new Date(start);

        switch (type){
            case "DAILY":
                end.setDate(end.getDate() + 1);
                break;
            case "WEEKLY":
                end.setDate(end.getDate() + 7);
                break;
            case "MONTHLY":
                end.setMonth(end.getMonth() + 1);
                break;
            case "YEARLY":
                end.setFullYear(end.getFullYear() + 1);
                break;
            default:
                throw new Error("tipo invalido");
        }

        return end;
    };

    if (type === "DAILY") {
        const endDate = calculateEndDate(now, type);

        return await prisma.membership.create({
            data: {
                userId,
                type,
                startDate: now,
                endDate,
                status: "ACTIVE",
            },
        });
    }

    if(activeMembership) {
        const newEndDate = calculateEndDate(activeMembership.endDate, type);

        return await prisma.membership.update({
            where: { id: activeMembership.id},
            data: {
                endDate: newEndDate,
            },
        });
    }

    const endDate = calculateEndDate(now, type);

    return await prisma.membership.create({
        data: {
            userId,
            type,
            startDate: now,
            endDate,
            status: "ACTIVE",
        },
    });
};