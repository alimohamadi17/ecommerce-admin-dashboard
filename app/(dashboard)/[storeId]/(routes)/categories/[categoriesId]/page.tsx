import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: { categoriesId: string; storeId: string };
}) => {
  const Category = await prismadb.category.findUnique({
    where: {
      id: params.categoriesId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-xy-4 pt-6 p-8">
        <CategoryForm billboards={billboards} initialData={Category} />
      </div>
    </div>
  );
};

export default CategoryPage;
