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
            _sum: {total: true},
            where: {}
        })
    ])
}