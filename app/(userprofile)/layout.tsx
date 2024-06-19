import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../ui/header";
import {ArrowLeftIcon, } from '@heroicons/react/24/outline'
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bright Bell - Your Favourite Gym Partner",
  description: "Your Favourite Gym Partner",
};

export default function UserProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
        <div className="min-h-full">
          <header className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <Link href="/home">
                        <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                </div>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
  );
}