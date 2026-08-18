import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.product.deleteMany({});

  const products = [
    {
      name: "Royal Rajwadi Kundan Choker Set",
      category: "Necklaces",
      price: 1850,
      material: "Brass with 24k Gold Polish & Pearls",
      tag: "Bestseller",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      description:
        "Handcrafted traditional bridal choker set paired with matching jhumkas.",
      inStock: true,
    },
    {
      name: "Peacock Motif Meenakari Jhumkas",
      category: "Earrings",
      price: 650,
      material: "Hand-painted Enamel & Kemp Stones",
      tag: "Trending",
      image:
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
      description:
        "Vibrant artisanal meenakari earrings crafted with natural beads.",
      inStock: true,
    },
    {
      name: "Traditional Floral Pearl Bangle Pair",
      category: "Bangles",
      price: 950,
      material: "Freshwater Pearls & Antique Gold Base",
      tag: "New Arrival",
      image:
        "https://images.unsplash.com/photo-1611591475878-578f244199aa?q=80&w=800&auto=format&fit=crop",
      description:
        "Delicate handcrafted floral motif bangles for festive occasions.",
      inStock: true,
    },
    {
      name: "Heritage Maharashtrian Kolhapuri Saaj",
      category: "Necklaces",
      price: 2400,
      material: "Pure Gold Plated Silver Alloy",
      tag: "Festive Collection",
      image:
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
      description:
        "Authentic 21-pan saaj necklace celebrating rich traditional heritage.",
      inStock: true,
    },
  ];

  for (const item of products) {
    await prisma.product.create({
      data: item,
    });
  }

  console.log("Database seeded successfully with initial products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });