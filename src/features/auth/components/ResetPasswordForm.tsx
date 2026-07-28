// src/features/auth/components/ResetPasswordForm.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  ShieldAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, setIsPending] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = React.useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const checkCapsLock = (e: React.KeyboardEvent) => {
    setIsCapsLockActive(e.getModifierState("CapsLock"));
  };

  const onSubmit = form.handleSubmit(async (values) => {
    if (!token) {
      toast.error("Invalid Security Token", {
        description: "No reset token found in URL. Please request a new link.",
      });
      return;
    }

    await authClient.resetPassword(
      {
        newPassword: values.password,
        token: token,
      },
      {
        onRequest: () => setIsPending(true),
        onSuccess: () => {
          setIsPending(false);
          setIsSuccess(true);
          toast.success("Security Key Overridden", {
            description:
              "Your secret key has been updated. Routing to login interface...",
          });
          setTimeout(() => router.push("/auth/login"), 2200);
        },
        onError: (ctx: { error: { message?: string } }) => {
          setIsPending(false);
          toast.error("Override Failed", {
            description:
              ctx.error?.message ||
              "Failed to update security key. Token may be expired or invalid.",
          });
        },
      },
    );
  });

  return (
    <main className='min-h-screen w-full flex items-center justify-center bg-[#09090b] relative overflow-hidden px-4'>
      {/* Background Image */}
      <div className='absolute inset-0 opacity-30 pointer-events-none scale-105 z-0'>
        <Image
          src='/auth-bg.png'
          alt='Nexus Terminal Background'
          fill
          priority
          quality={100}
          className='object-cover object-center'
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none' />

      {/* Main Container */}
      <div
        className={cn(
          "w-full max-w-[440px] border border-border/40 bg-card/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 transition-all duration-500 scale-in-center",
          isSuccess &&
            "border-primary/40 shadow-[0_0_20px_rgba(132,204,34,0.15)] bg-primary/[0.01]",
        )}
      >
        {/* Success Overlay */}
        {isSuccess && (
          <div className='absolute inset-0 bg-background/90 backdrop-blur-xl rounded-3xl z-50 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in-95 duration-300'>
            <div className='p-4 rounded-full bg-primary/10 text-primary mb-4 shadow-[0_0_20px_rgba(132,204,34,0.2)] scale-up-center'>
              <CheckCircle2 className='size-12 animate-pulse' />
            </div>
            <h3 className='text-xl font-black text-foreground tracking-tight'>
              Security Key Overridden
            </h3>
            <p className='text-xs text-muted-foreground mt-1 max-w-[260px] leading-relaxed uppercase tracking-wider'>
              Cryptographic credentials updated. Re-establishing terminal handshake...
            </p>
          </div>
        )}

        {/* Header */}
        <div className='text-center space-y-2 mb-8'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-muted/30 border border-border/40 text-[10px] uppercase tracking-widest text-zinc-400'>
            <span className='size-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(132,204,34,0.8)] animate-pulse' />
            NEXUS OS v2.2.6
          </div>
          <h2 className='text-2xl font-black tracking-tight text-foreground sm:text-3xl flex items-center justify-center gap-2'>
            <KeyRound className='size-6 text-primary' /> Reset Security Key
          </h2>
          <p className='text-xs text-zinc-400 leading-relaxed'>
            Define your new secret security key to regain access to your node environment.
          </p>
        </div>

        {/* No Token State */}
        {!token ? (
          <div className='flex flex-col items-center text-center space-y-5 py-4'>
            <div className='p-4 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20'>
              <ShieldAlert className='size-10 animate-bounce' />
            </div>
            <div className='space-y-1'>
              <h3 className='text-base font-bold text-foreground'>
                Missing Security Token
              </h3>
              <p className='text-xs text-zinc-400 max-w-[280px] leading-relaxed'>
                No valid cryptographic token was detected in your request URL. Please check your email link or request a new key override.
              </p>
            </div>

            <Button
              asChild
              className='w-full h-12 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer'
            >
              <Link href='/auth/login'>Return to Login Matrix</Link>
            </Button>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={onSubmit}
            onKeyDown={checkCapsLock}
            className='flex flex-col gap-y-6'
          >
            {/* New Password field */}
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <div className='relative group flex flex-col'>
                  <div className='absolute left-3.5 top-1/2 -translate-y-1/2 z-20 text-zinc-400 group-focus-within:text-primary transition-colors'>
                    <Lock className='size-4' />
                  </div>
                  <Input
                    {...field}
                    id='new-password'
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    disabled={isPending}
                    placeholder=' '
                    className={cn(
                      "peer w-full h-12 pl-10 pr-10 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4",
                      fieldState.invalid &&
                        "border-destructive focus-visible:ring-destructive",
                    )}
                  />

                  <label
                    htmlFor='new-password'
                    className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                  >
                    New Secret Security Key
                  </label>

                  <button
                    type='button'
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground cursor-pointer transition-colors z-20 size-7 flex items-center justify-center rounded-lg'
                  >
                    {showPassword ? (
                      <EyeOff className='size-4' />
                    ) : (
                      <Eye className='size-4' />
                    )}
                  </button>

                  {fieldState.invalid && (
                    <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                      <AlertCircle className='size-3 shrink-0' />
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Confirm Password field */}
            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <div className='relative group flex flex-col'>
                  <div className='absolute left-3.5 top-1/2 -translate-y-1/2 z-20 text-zinc-400 group-focus-within:text-primary transition-colors'>
                    <Lock className='size-4' />
                  </div>
                  <Input
                    {...field}
                    id='confirm-password'
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={isPending}
                    placeholder=' '
                    className={cn(
                      "peer w-full h-12 pl-10 pr-10 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4",
                      fieldState.invalid &&
                        "border-destructive focus-visible:ring-destructive",
                    )}
                  />

                  <label
                    htmlFor='confirm-password'
                    className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                  >
                    Confirm Security Key
                  </label>

                  <button
                    type='button'
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground cursor-pointer transition-colors z-20 size-7 flex items-center justify-center rounded-lg'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='size-4' />
                    ) : (
                      <Eye className='size-4' />
                    )}
                  </button>

                  {fieldState.invalid && (
                    <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                      <AlertCircle className='size-3 shrink-0' />
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Caps lock alert */}
            {isCapsLockActive && (
              <div className='flex items-center gap-2 p-2 px-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] uppercase tracking-wider animate-in fade-in duration-200'>
                <AlertCircle className='size-3.5 shrink-0 animate-bounce' />
                Warning: Caps Lock is active on your host
              </div>
            )}

            <Button
              type='submit'
              disabled={isPending}
              className='w-full h-12 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(132,204,34,0.15)] hover:shadow-[0_0_25px_rgba(132,204,34,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2'
            >
              {isPending ? (
                <>
                  <Loader2 className='size-4 animate-spin' /> Updating Key...
                </>
              ) : (
                <>
                  <ArrowRight className='size-4' /> Override Security Key
                </>
              )}
            </Button>

            <div className='text-center pt-2 text-xs text-zinc-400'>
              Remember your security key?{" "}
              <Link
                href='/auth/login'
                className='text-primary font-bold hover:underline cursor-pointer transition-all'
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
