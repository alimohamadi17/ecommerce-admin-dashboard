import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//GET

export async function GET(
  req: Request,
  { params }: { params: { ColorId: string } }
) {
  try {
    if (!params.ColorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    //check for authorize user for change and updating data

    const color = await prismadb.color.findUnique({
      where: {
        id: params.ColorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);

    return new NextResponse("Interal Error", { status: 500 });
  }
}

//update
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
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

    const colors = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_PATCH]", error);

    return new NextResponse("Interal Error", { status: 500 });
  }
}

//delete
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);

    return new NextResponse("Interal Error", { status: 500 });
  }
}
