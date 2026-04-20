import prisma from "../config/prisma.js";

export const createSaleService = async ({ userId, items }) => {
  if (!items || items.length === 0) {
    throw new Error("No hay productos en la venta");
  }

  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  const productMap = new Map();
  products.forEach((p) => productMap.set(p.id, p));

  let total = 0;

  for (const item of items) {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new Error(`Producto ${item.productId} no existe`);
    }

    if (item.quantity <= 0) {
      throw new Error("Cantidad inválida");
    }

    total += product.price * item.quantity;
  }

  const sale = await prisma.$transaction(async (tx) => {
    const newSale = await tx.sale.create({
      data: {
        userId,
        total,
      },
    });

    await tx.saleDetail.createMany({
      data: items.map((item) => ({
        saleId: newSale.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    return tx.sale.findUnique({
      where: { id: newSale.id },
      include: {
        details: true,
      },
    });
  });

  return sale;
};