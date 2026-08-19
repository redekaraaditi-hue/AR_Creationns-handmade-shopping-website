import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: startOfYear },
        status: { in: ["delivered", "shipped", "confirmed", "pending"] },
      },
      select: {
        createdAt: true,
        totalAmount: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const monthlyData: {
      name: string;
      orders: number;
      income: number;
    }[] = [
      { name: "Jan", orders: 0, income: 0 },
      { name: "Feb", orders: 0, income: 0 },
      { name: "Mar", orders: 0, income: 0 },
      { name: "Apr", orders: 0, income: 0 },
      { name: "May", orders: 0, income: 0 },
      { name: "Jun", orders: 0, income: 0 },
      { name: "Jul", orders: 0, income: 0 },
      { name: "Aug", orders: 0, income: 0 },
      { name: "Sep", orders: 0, income: 0 },
      { name: "Oct", orders: 0, income: 0 },
      { name: "Nov", orders: 0, income: 0 },
      { name: "Dec", orders: 0, income: 0 },
    ];

    orders.forEach((order) => {
      const monthIndex = new Date(order.createdAt).getMonth();
      if (monthlyData[monthIndex]) {
        monthlyData[monthIndex].orders += 1;
        monthlyData[monthIndex].income += order.totalAmount || 0;
      }
    });

    return NextResponse.json(monthlyData);
  } catch (error: any) {
    console.error("API analytics error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}