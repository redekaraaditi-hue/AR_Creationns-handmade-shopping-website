import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all jewelry products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Add a new product (Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        price: parseFloat(body.price),
        material: body.material,
        tag: body.tag,
        image: body.image,
        description: body.description,
        inStock: body.inStock ?? true,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}