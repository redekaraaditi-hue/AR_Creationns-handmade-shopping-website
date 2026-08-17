import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all customer orders (Admin)
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST: Record a new checkout order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNumber = `ARC-${Date.now().toString().slice(-6)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: body.fullName,
        phone: body.phone,
        address: body.address,
        city: body.city,
        pincode: body.pincode,
        notes: body.notes || null,
        totalAmount: parseFloat(body.grandTotal),
        paymentMethod: body.paymentMethod,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order record" },
      { status: 500 }
    );
  }
}