import AppSidebar from "@/components/shared/AppSidebar";
import Header from "@/components/shared/Header";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NotificationProvider } from "@/features/notifications/context/NotificationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <NotificationProvider>
        <SidebarProvider>
          <AppSidebar />

          {/* 1. Add w-full and overflow-x-hidden to prevent overflow*/}
          <SidebarInset className='w-full overflow-x-hidden flex flex-col min-h-screen'>
            <Header />

            {/* 2. Add min-w-0 to solve Data Table bug in Flexbox */}
            <main className='flex-1 w-full min-w-0 p-4 md:p-6 lg:p-8'>
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        {/* Add Toaster with Premium Settings richColors: Enables semantic colors 
        (green for success, red for error)   
      */}
        <Toaster
          richColors
          position='bottom-right'
          toastOptions={{
            style: { fontFamily: "var(--font-geist-sans)" },
            className:
              "border-border/60 bg-popover/95 backdrop-blur-md text-sm",
          }}
        />
      </NotificationProvider>
    </TooltipProvider>
  );
}
