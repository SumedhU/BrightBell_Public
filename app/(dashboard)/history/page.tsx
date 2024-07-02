"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Feed from "./feed";
import Heatmap from "@/app/ui/heatmap";
export default function History() {

  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('Checking authToken:', authToken);
    if (!authToken) {
      router.push('/login');
    }
  }, [router]);
    return (
      <>
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">History</h1>
          </div>
        </header>
        <div className="min-h-full">
            <Heatmap />
            <Feed />
        </div>
      </>
    );
  }