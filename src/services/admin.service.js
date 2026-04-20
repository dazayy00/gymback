import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async ({ name, email, password }) => {
    const hashed = await bcrypt.hash(password, 10);

    return prisma.admin.create({
        data: {
            name, 
            email,
            password: hashed,
        },
    });
};

export const loginAdmin = async ({ email, password }) => {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) throw new Error("Admin no existe");

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid ) throw new Error("credenciales invalidas");

    const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET
    );

    return {admin, token};
};