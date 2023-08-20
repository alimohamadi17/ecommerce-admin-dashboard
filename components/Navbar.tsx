import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className=" h-16 flex items-center justify-center px-4">
        <StoreSwitcher items={store} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
