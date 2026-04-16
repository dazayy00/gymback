import { createUserService } from "../services/user.service.js";

export const createUser = async (req, res) => {
    try{
        const result = await createUserService(req.body);
        
        res.status(201).json({
            message: "usuario creado correctamente",
            data: result,
        });
    } catch (error){
        console.error(error);

        res.status(500).json({
            message: "error al crear usuario",
        });
    }
};