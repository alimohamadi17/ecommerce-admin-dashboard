import React from "react";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import SizesClient from "./components/client";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedsizes: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 pt-6 p-4">
        <SizesClient data={formattedsizes} />
      </div>
    </div>
  );
};

export default SizePage;
