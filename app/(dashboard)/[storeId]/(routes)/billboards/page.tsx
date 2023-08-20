import React from "react";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const BillBoradsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 pt-6 p-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillBoradsPage;
