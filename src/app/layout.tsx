"use client";
import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { usePathname } from 'next/navigation'; // Import usePathname

// export const metadata: Metadata = {
//   title: {
//     template: "%s | NextAdmin - Next.js Dashboard Kit",
//     default: "Oneworld Admin Dashboard",
//   },
//   description:
//     "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
// };

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname(); // Get the current route
  
  // Conditionally render Sidebar and Header
  const showSidebarHeader = !pathname?.includes('/auth/sign-in') && !pathname?.includes('/auth/sign-up');

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            {showSidebarHeader && <Sidebar />}  {/* Only show Sidebar if not on sign-in or sign-out pages */}
            
            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              {showSidebarHeader && <Header />}  {/* Only show Header if not on sign-in or sign-out pages */}

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
