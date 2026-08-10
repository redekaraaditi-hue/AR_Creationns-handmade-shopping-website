import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "AURA | Handmade Jewelry",
  description: "Artisanal handcrafted jewelry for every occasion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-stone-900 bg-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}