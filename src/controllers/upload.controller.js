import supabase from "../config/supabase.js";

export const uploadUserPhoto = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Archivo requerido",
      });
    }

    const fileName = `user-${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from("users")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("users")
      .getPublicUrl(fileName);

    res.json({
      imageUrl: data.publicUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al subir imagen",
    });
  }
};