import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html className="h-full bg-white">
        <body className="h-full">
            {children}
        </body>
    </html>
  );
}