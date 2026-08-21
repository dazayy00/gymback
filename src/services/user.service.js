import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

export const createUserService = async(data) => {
    const { name, email, phone } = data;

    const token = jwt.sign(
        { name, email },
        process.env.JWT_SECRET,
        { expiresIn: "365d" }
    );

    const qrImage = await QRCode.toDataURL(token);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            phone,
            qrCode: token,
        },
    });

    return {
        user, 
        qrImage,
    };
};

export const getUsersService = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};