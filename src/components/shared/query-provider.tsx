// src/providers/query-provider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // 🚀 ساخت QueryClient امن برای Next.js (جلوگیری از ساخت مجدد در هر رندر)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // دیتا تا ۵ دقیقه تازه می‌ماند
            refetchOnWindowFocus: false, // جلوگیری از کوئری زدن بی‌مورد با فوکوس روی مرورگر
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
