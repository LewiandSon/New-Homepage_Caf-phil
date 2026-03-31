"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as gtag from "@/lib/gtag";

export default function NotFound() {
  useEffect(() => {
    // Track 404 errors with the attempted URL
    const attemptedUrl = window.location.pathname + window.location.search;
    gtag.event({
      action: 'error',
      category: '404',
      label: attemptedUrl,
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F1DA] text-[#D72333] font-serif flex flex-col items-center justify-center px-4">
      <div className="max-w-[600px] text-center">
        <h1 className="text-6xl font-black italic mb-6">404</h1>
        <h2 className="text-3xl font-black italic mb-4">Seite nicht gefunden</h2>
        <p className="text-xl mb-8">
          Die Seite, die du suchst, existiert leider nicht.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border-3 border-[#D72333] text-[#D72333] hover:bg-[#D72333] hover:text-[#F9F1DA] transition-all duration-150 font-black italic text-lg"
          >
            Zur Startseite
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-6 py-3 border-3 border-[#D72333] text-[#D72333] hover:bg-[#D72333] hover:text-[#F9F1DA] transition-all duration-150 font-black italic text-lg"
          >
            Zu den Events
          </Link>
        </div>
      </div>
    </main>
  );
}
