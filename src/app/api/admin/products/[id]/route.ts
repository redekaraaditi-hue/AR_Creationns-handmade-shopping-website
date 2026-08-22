import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      category,
      price,
      material,
      image,
      description,
      tag,
      rating,
      reviewsCount,
      inStock,
    } = body;

    const data: Record<string, any> = {};
    if (name !== undefined) data.name = String(name).trim();
    if (category !== undefined) data.category = String(category).trim();
    if (price !== undefined && price !== "") data.price = parseFloat(price);
    if (material !== undefined) data.material = material;
    if (image !== undefined) data.image = image;
    if (description !== undefined) data.description = description;
    if (tag !== undefined) data.tag = tag;
    if (rating !== undefined && rating !== "") data.rating = parseFloat(rating);
    if (reviewsCount !== undefined && reviewsCount !== "")
      data.reviewsCount = parseInt(reviewsCount);
    if (inStock !== undefined) data.inStock = Boolean(inStock);

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error("Prisma product update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Prisma product delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}