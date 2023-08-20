"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heding";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { ColorsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface SizesClientProps {
  data: ColorsColumn[];
}
const ColorsClient: FC<SizesClientProps> = ({ data }) => {
  const route = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" gap-2">
        <div className="flex items-center justify-between">
          <Heading
            title={`Colors (${data?.length})`}
            description="Manage colors for your store"
          />
          <Button onClick={() => route.push(`/${params.storeId}/colors/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
        <Separator />
        <div className="pt-5">
          <DataTable searchKey="name" columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default ColorsClient;
