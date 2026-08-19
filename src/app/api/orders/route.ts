import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      address,
      city,
      pincode,
      notes,
      paymentMethod = "cod",
      items = [],
    } = body;

    if (!customerName || !phone || !address || !city || !pincode) {
      return NextResponse.json(
        { error: "Please fill in all shipping details." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    // Calculate total amount
    const subtotal = items.reduce(
      (sum: number, item: any) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    const shipping = subtotal >= 1000 ? 0 : 80;
    const totalAmount = subtotal + shipping;

    const orderNumber = `ARC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    // Create the order directly
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: String(customerName),
        phone: String(phone),
        address: String(address),
        city: String(city),
        pincode: String(pincode),
        notes: notes ? String(notes) : null,
        totalAmount: Number(totalAmount),
        paymentMethod: String(paymentMethod),
        status: "pending",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || item.id || undefined,
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    console.error("ORDER ERROR DETAILS:", error);
    // Send exact error message back to the frontend
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch" }, { status: 500 });
  }
}