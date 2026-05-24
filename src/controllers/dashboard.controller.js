import { getDashboardData } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
    try {
        const data = await getDashboardData();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error en el dashboard",
        });
    }
};