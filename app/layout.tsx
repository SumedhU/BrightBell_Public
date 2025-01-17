import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bright Bell - Your Favourite Gym Partner",
  description: "Your Favourite Gym Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white px-20 py-10 {inter.className}" >
        {children}</body>
    </html>
  );
}
