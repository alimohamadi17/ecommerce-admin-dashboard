import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//GET

export async function GET(
  req: Request,
  { params }: { params: { categoriesId: string } }
) {
  try {
    if (!params.categoriesId) {
      return new NextResponse("Categories ID is required", { status: 400 });
    }

    //check for authorize user for change and updating data

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoriesId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);

    return new NextResponse("Interal Error", { status: 500 });
  }
}

//update
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard  is required", { status: 400 });
    }
    if (!params.categoriesId) {
      return new NextResponse("Categories ID is required", { status: 400 });
    }

    //check for authorize user for change and updating data

    const storeByuserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByuserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoriesId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_PATCH]", error);

    return new NextResponse("Interal Error", { status: 500 });
  }
}

//delete
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.categoriesId) {
      return new NextResponse("Categories ID is required", { status: 400 });
    }

    //check for authorize user for change and updating data

    const storeByuserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByuserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const categories = await prismadb.category.deleteMany({
      where: {
        id: params.categoriesId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_DELETE]", error);

    return new NextResponse("Interal Error", { status: 500 });
  }
}
