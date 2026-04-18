import { createMembershipService } from "../services/membership.service.js";

export const createMembership = async (req, res) => {

    try{
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