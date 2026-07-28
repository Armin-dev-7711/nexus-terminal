// src/features/dashboard/components/DashboardHeader.tsx
"use client";

import * as React from "react";
import { Plus, ArrowLeftRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLiveClock } from "../hooks/useLiveClock";
import { useSession } from "@/lib/auth-client"; // 🚀 اتصال به سشن Better Auth

interface DashboardHeaderProps {
  onOpenModal: (type: "add" | "transfer") => void;
}

export function DashboardHeader({ onOpenModal }: DashboardHeaderProps) {
  const currentTime = useLiveClock();

  // 🚀 ۱. دریافت اطلاعات سشن زنده کاربر
  const { data: session, isPending } = useSession();

  // 🚀 ۲. استخراج هوشمند اسم کاربر (پشتیبانی کامل از OAuth و ثبت‌نام عادی)
  const user = session?.user;
  const fullName = user?.name || user?.email?.split("@")[0] || "Operator";

  // جدا کردن اسم کوچک (First Name) برای نمایش صمیمی‌تر و شیک‌تر در هدر
  const firstName = fullName.trim().split(" ")[0];
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Welcome Back,{" "}
          {isPending ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground animate-pulse text-xl">
              <Loader2 className="size-4 animate-spin" /> Syncing...
            </span>
          ) : (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
              {formattedFirstName}
            </span>
          )}
        </h2>
        <p className="text-xs text-muted-foreground tracking-wide">
          {currentTime || "Loading live connection..."}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          size="sm"
          onClick={() => onOpenModal("add")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-4 gap-2 cursor-pointer h-9 shadow-md shadow-primary/10 transition-transform active:scale-95"
        >
          <Plus className="size-4" /> <span>Add Asset</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onOpenModal("transfer")}
          className="border-border bg-muted/20 text-foreground hover:bg-muted/40 rounded-xl px-4 gap-2 cursor-pointer h-9 transition-transform active:scale-95"
        >
          <ArrowLeftRight className="size-4 text-muted-foreground" />{" "}
          <span>Transfer</span>
        </Button>
      </div>
    </div>
  );
}
