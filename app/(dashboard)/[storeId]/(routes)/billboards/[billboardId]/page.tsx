import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/BillboardForm";

const BillBoradPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-xy-4 pt-6 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillBoradPage;
