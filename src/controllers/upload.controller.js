import crypto from "crypto";
import path from "path";
import supabase from "../config/supabase.js";

export const uploadUserPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No se recibió ninguna imagen",
      });
    }

    const extension = path
      .extname(req.file.originalname)
      .toLowerCase();

    const fileName = `user-${Date.now()}-${crypto
      .randomBytes(8)
      .toString("hex")}${extension}`;

    const { error } = await supabase.storage
      .from("users")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("SUPABASE STORAGE ERROR:", error);

      return res.status(500).json({
        message: "No se pudo subir la imagen",
      });
    }

    const { data } = supabase.storage
      .from("users")
      .getPublicUrl(fileName);

    return res.status(201).json({
      message: "Imagen subida correctamente",
      imageUrl: data.publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: "Error al subir imagen",
    });
  }
};