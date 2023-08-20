"use client";

import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/ui/heding";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}
const OrderClient: FC<OrderClientProps> = ({ data }) => {
  const route = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${data?.length})`}
        description="Manage orders for your store"
      />

      <Separator />
      <div className="pt-5">
        <DataTable searchKey="products" columns={columns} data={data} />
      </div>
    </>
  );
};

export default OrderClient;
