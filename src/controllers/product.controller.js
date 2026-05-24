import prisma from "../config/prisma.js";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error("ERROR GET PRODUCTS:", error);

    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("ERROR GET PRODUCT:", error);

    res.status(500).json({
      message: "Error al obtener producto",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      barcode,
      imageUrl,
    } = req.body;

    if (!name || price == null) {
      return res.status(400).json({
        message: "Nombre y precio requeridos",
      });
    }

    const existingBarcode = barcode
      ? await prisma.product.findUnique({
          where: { barcode },
        })
      : null;

    if (existingBarcode) {
      return res.status(400).json({
        message: "Código de barras ya existe",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock || 0),
        barcode,
        imageUrl,
      },
    });

    res.status(201).json({
      message: "Producto creado",
      data: product,
    });
  } catch (error) {
    console.error("ERROR CREATE PRODUCT:", error);

    res.status(500).json({
      message: "Error al crear producto",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      description,
      price,
      stock,
      barcode,
      imageUrl,
      isActive,
    } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price != null ? Number(price) : undefined,
        stock: stock != null ? Number(stock) : undefined,
        barcode,
        imageUrl,
        isActive,
      },
    });

    res.json({
      message: "Producto actualizado",
      data: product,
    });
  } catch (error) {
    console.error("ERROR UPDATE PRODUCT:", error);

    res.status(500).json({
      message: "Error al actualizar producto",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    res.json({
      message: "Producto eliminado",
    });
  } catch (error) {
    console.error("ERROR DELETE PRODUCT:", error);

    res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
};