import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bright Bell - Your Favourite Gym Partner",
  description: "Your Favourite Gym Partner",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
        <div className="min-h-full">
          <Header />
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white">{children}</div>
          </main>
        </div>
  );
}