import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**", // Allows any external image URL (Supabase, Unsplash, Cloudinary, etc.)
      },
    ],
  },
};

export default nextConfig;