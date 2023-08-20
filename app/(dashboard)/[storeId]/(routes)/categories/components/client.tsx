"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heding";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { CategoriesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface CategoriesClientProps {
  data: CategoriesColumn[];
}
const CategoriesClient: FC<CategoriesClientProps> = ({ data }) => {
  const route = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" gap-2">
        <div className="flex items-center justify-between">
          <Heading
            title={`Category (${data?.length})`}
            description="Manage categories for your store"
          />
          <Button
            onClick={() => route.push(`/${params.storeId}/categories/new`)}
          >
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

export default CategoriesClient;
