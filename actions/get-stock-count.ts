import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return stockCount;
};
