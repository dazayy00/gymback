import prisma from "../config/prisma.js";

export const getDashboardData = async () => {
    const now = new Date();

    const startOfDay = new Date (
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ); 

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    const[
        salesToday,
        salesMonth,
        totalSales,
        activeUsersToday,
        visitorsToday,
    ] = await Promise.all([
        prisma.sale.aggregate({
            _sum: { total: true },
            where: {
                createdAt: { gte: startOfDay },
            },
        }),

        prisma.sale.aggregate({
            _sum: { total: true },
            where: {
                createdAt: { gte: startOfMonth },
            },
        }),

        prisma.sale.count(),

        prisma.accessLog.count({
            where: {
                success: true,
                createdAt: { gte: startOfDay },
            },
        }),

        prisma.membership.count({
            where: {
                type: "DAILY",
                startDate: { gte: startOfDay },
            },
        }),
    ]);

    return {
        incomeToday: salesToday._sum.total || 0,
        incomeMonth: salesMonth._sum.total || 0,
        totalSales,
        activeUsersToday,
        visitorsToday,
    };
};