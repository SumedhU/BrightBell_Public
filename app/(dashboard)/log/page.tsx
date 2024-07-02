"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Log() {
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
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Log</h1>
        </div>
      </header>
    </>
  );
}
