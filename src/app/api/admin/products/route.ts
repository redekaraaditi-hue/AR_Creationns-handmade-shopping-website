import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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

    if (!name || !category || price === undefined || price === "") {
      return NextResponse.json(
        { error: "Product title, category, and price are required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: String(name).trim(),
        category: String(category).trim(),
        price: parseFloat(price),
        material: material || "Traditional Handcrafted",
        image:
          image ||
          "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
        description: description || "Authentic handcrafted jewellery by Aaditi.",
        tag: tag || null,
        rating: rating !== undefined && rating !== "" ? parseFloat(rating) : 4.8,
        reviewsCount:
          reviewsCount !== undefined && reviewsCount !== ""
            ? parseInt(reviewsCount)
            : 12,
        inStock: inStock !== undefined ? Boolean(inStock) : true,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("Prisma product create error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}