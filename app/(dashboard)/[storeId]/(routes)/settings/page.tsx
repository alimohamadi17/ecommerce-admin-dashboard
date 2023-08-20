import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";
import SettingForm from "./components/SettingForm";

interface SettingPageProps {
  params: { storeId: string };
}

const SettingPage: FC<SettingPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className=" flex-1 space-y-6 pt-6 p-8">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
