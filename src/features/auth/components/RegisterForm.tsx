// src/features/auth/components/RegisterForm.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import {
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  AtSign,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Check,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRegister } from "../hooks/useRegister";

export function RegisterForm() {
  const {
    form,
    isPending,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSuccess,
    passwordRequirements,
    passwordStrengthScore,
    onSubmit,
  } = useRegister();

  return (
    <main className='min-h-screen w-full flex items-center justify-center bg-[#09090b] relative overflow-hidden px-4 py-12'>
      <div className='absolute inset-0 opacity-25 pointer-events-none scale-105 z-0'>
        <Image
          src='/register-bg.png'
          alt='Nexus Core Infrastructure Background'
          fill
          priority
          quality={100}
          className='object-cover object-center'
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none' />

      <div
        className={cn(
          "w-full max-w-[480px] border border-border/40 bg-card/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 transition-all duration-500 scale-in-center",
          isSuccess &&
            "border-primary/40 shadow-[0_0_40px_rgba(132,204,34,0.15)] bg-primary/[0.01]",
        )}
      >
        {isSuccess && (
          <div className='absolute inset-0 bg-background/95 backdrop-blur-xl rounded-3xl z-50 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in-95 duration-300'>
            <div className='p-4 rounded-full bg-primary/10 text-primary mb-4 shadow-[0_0_25px_rgba(132,204,34,0.25)] scale-up-center'>
              <CheckCircle2 className='size-12 animate-pulse' />
            </div>
            <h3 className='text-xl font-black text-foreground tracking-tight'>
              Identity Node Spawned
            </h3>
            <p className='text-xs text-muted-foreground mt-1 max-w-[280px] leading-relaxed uppercase tracking-wider'>
              Master cryptographic keys built. Redirecting to validation
              portal...
            </p>
          </div>
        )}

        <div className='text-center space-y-2 mb-8'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-muted/30 border border-border/40 text-[10px] uppercase tracking-widest text-zinc-400'>
            <span className='size-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(132,204,34,0.8)] animate-pulse' />
            Secure Node Provisioning
          </div>
          <h2 className='text-2xl font-black tracking-tight text-foreground sm:text-3xl'>
            Create Master Key
          </h2>
          <p className='text-xs text-zinc-400 leading-relaxed'>
            Initialize your encrypted ledger space and link with Nexus arrays.
          </p>
        </div>

        <form onSubmit={onSubmit} className='flex flex-col gap-y-6'>
          {/* Full name */}
          <Controller
            name='fullName'
            control={form.control}
            render={({ field, fieldState }) => (
              <div className='relative group flex flex-col'>
                <div className='absolute left-3.5 top-1/2 -translate-y-1/2 z-20 text-zinc-400 group-focus-within:text-primary transition-colors'>
                  <User className='size-4' />
                </div>
                <Input
                  {...field}
                  id='fullName'
                  disabled={isPending}
                  placeholder=' '
                  className={cn(
                    "peer w-full h-12 pl-10 pr-4 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                />
                <label
                  htmlFor='fullName'
                  className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                >
                  Operational Full Name
                </label>
                {fieldState.invalid && (
                  <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                    <AlertCircle className='size-3 shrink-0' />{" "}
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Username */}
          <Controller
            name='username'
            control={form.control}
            render={({ field, fieldState }) => (
              <div className='relative group flex flex-col'>
                <div className='absolute left-3.5 top-1/2 -translate-y-1/2 z-20 text-zinc-400 group-focus-within:text-primary transition-colors'>
                  <AtSign className='size-4' />
                </div>
                <Input
                  {...field}
                  id='username'
                  disabled={isPending}
                  placeholder=' '
                  className={cn(
                    "peer w-full h-12 pl-10 pr-4 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4 lowercase",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                />
                <label
                  htmlFor='username'
                  className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                >
                  Node Alias Handle (Optional)
                </label>
                {fieldState.invalid && (
                  <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                    <AlertCircle className='size-3 shrink-0' />{" "}
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <div className='relative group flex flex-col'>
                <div className='absolute left-3.5 top-1/2 -translate-y-1/2 z-20 text-zinc-400 group-focus-within:text-primary transition-colors'>
                  <Mail className='size-4' />
                </div>
                <Input
                  {...field}
                  id='email'
                  type='email'
                  disabled={isPending}
                  placeholder=' '
                  className={cn(
                    "peer w-full h-12 pl-10 pr-4 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                />
                <label
                  htmlFor='email'
                  className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                >
                  Secure Communication Mail
                </label>
                {fieldState.invalid && (
                  <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                    <AlertCircle className='size-3 shrink-0' />{" "}
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Password */}
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
                  id='password'
                  type={showPassword ? "text" : "password"}
                  disabled={isPending}
                  placeholder=' '
                  className={cn(
                    "peer w-full h-12 pl-10 pr-10 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4",
                    fieldState.invalid &&
                      "border-destructive focus-visible:ring-destructive",
                  )}
                />
                <label
                  htmlFor='password'
                  className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                >
                  Generate Master Encryption Key
                </label>

                <button
                  type='button'
                  tabIndex={-1}
                  onClick={setShowPassword}
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
                    <AlertCircle className='size-3 shrink-0' />{" "}
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Password strength bar and checklist */}
          <div className='space-y-2 -mt-2'>
            <div className='flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-400 px-1'>
              <span>Key Entropy Analysis</span>
              <span
                className={cn(
                  "font-bold transition-colors duration-300",
                  passwordStrengthScore === 1 && "text-rose-500",
                  passwordStrengthScore === 2 && "text-amber-500",
                  passwordStrengthScore === 3 && "text-yellow-400",
                  passwordStrengthScore === 4 && "text-primary shadow-sm",
                )}
              >
                {passwordStrengthScore === 0 && "Null"}
                {passwordStrengthScore === 1 && "Weak Node"}
                {passwordStrengthScore === 2 && "Medium Node"}
                {passwordStrengthScore === 3 && "Strong Protection"}
                {passwordStrengthScore === 4 && "Military Grade"}
              </span>
            </div>

            <div className='grid grid-cols-4 gap-1.5 h-1.5 px-1'>
              {[1, 2, 3, 4].map((index) => {
                const isActive = passwordStrengthScore >= index;
                return (
                  <div
                    key={index}
                    className={cn(
                      "h-full rounded-full transition-all duration-500 bg-muted/20 border border-border/10",
                      isActive &&
                        index === 1 &&
                        "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)] border-transparent",
                      isActive &&
                        index === 2 &&
                        "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] border-transparent",
                      isActive &&
                        index === 3 &&
                        "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)] border-transparent",
                      isActive &&
                        index === 4 &&
                        "bg-primary shadow-[0_0_10px_rgba(132,204,34,0.6)] border-transparent",
                    )}
                  />
                );
              })}
            </div>

            <div className='grid grid-cols-2 gap-2 pt-2 px-1 text-[11px] text-zinc-400'>
              <div
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-300",
                  passwordRequirements.hasMinLength && "text-foreground",
                )}
              >
                <div
                  className={cn(
                    "size-3.5 rounded-md border border-border/60 flex items-center justify-center shrink-0",
                    passwordRequirements.hasMinLength &&
                      "bg-primary/10 border-primary text-primary",
                  )}
                >
                  <Check className='size-2.5' strokeWidth={4} />
                </div>
                <span>8+ Characters</span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-300",
                  passwordRequirements.hasUppercase && "text-foreground",
                )}
              >
                <div
                  className={cn(
                    "size-3.5 rounded-md border border-border/60 flex items-center justify-center shrink-0",
                    passwordRequirements.hasUppercase &&
                      "bg-primary/10 border-primary text-primary",
                  )}
                >
                  <Check className='size-2.5' strokeWidth={4} />
                </div>
                <span>Uppercase Letter</span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-300",
                  passwordRequirements.hasNumber && "text-foreground",
                )}
              >
                <div
                  className={cn(
                    "size-3.5 rounded-md border border-border/60 flex items-center justify-center shrink-0",
                    passwordRequirements.hasNumber &&
                      "bg-primary/10 border-primary text-primary",
                  )}
                >
                  <Check className='size-2.5' strokeWidth={4} />
                </div>
                <span>Contains Number</span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-300",
                  passwordRequirements.hasSpecial && "text-foreground",
                )}
              >
                <div
                  className={cn(
                    "size-3.5 rounded-md border border-border/60 flex items-center justify-center shrink-0",
                    passwordRequirements.hasSpecial &&
                      "bg-primary/10 border-primary text-primary",
                  )}
                >
                  <Check className='size-2.5' strokeWidth={4} />
                </div>
                <span>Special Symbol</span>
              </div>
            </div>
          </div>

          {/* Confirm password */}
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
                  id='confirmPassword'
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
                  htmlFor='confirmPassword'
                  className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                >
                  Re-enter Master Security Key
                </label>

                <button
                  type='button'
                  tabIndex={-1}
                  onClick={setShowConfirmPassword}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
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
                    <AlertCircle className='size-3 shrink-0' />{" "}
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* قوانین و ایمیل */}
          <div className='flex flex-col gap-y-2 pt-2'>
            <Controller
              name='acceptTerms'
              control={form.control}
              render={({ field, fieldState }) => (
                <div className='relative flex flex-col'>
                  <div className='flex items-start gap-2.5'>
                    <Checkbox
                      id='terms'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                      className='rounded-md border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary size-4 mt-0.5'
                    />
                    <label
                      htmlFor='terms'
                      className='text-xs text-zinc-300 select-none cursor-pointer hover:text-foreground transition-colors leading-tight'
                    >
                      I ratify the secure data storage policies and network
                      protocol clauses of the NEXUS Platform.
                    </label>
                  </div>
                  {fieldState.invalid && (
                    <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                      <AlertCircle className='size-3 shrink-0' />{" "}
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name='newsletter'
              control={form.control}
              render={({ field }) => (
                <div className='flex items-center gap-2.5 mt-3 pl-0.5'>
                  <Checkbox
                    id='newsletter'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                    className='rounded-md border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary size-4'
                  />
                  <label
                    htmlFor='newsletter'
                    className='text-xs text-zinc-400 select-none cursor-pointer hover:text-foreground transition-colors'
                  >
                    Receive diagnostic patch notes and token index updates.
                  </label>
                </div>
              )}
            />
          </div>

          <Button
            type='submit'
            disabled={isPending}
            className='w-full h-12 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(132,204,34,0.15)] hover:shadow-[0_0_25px_rgba(132,204,34,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4'
          >
            {isPending ? (
              <>
                <Loader2 className='size-4 animate-spin' /> Instantiating Secure
                Account Core...
              </>
            ) : (
              <>
                <ArrowRight className='size-4' /> Compile & Initialize Account
              </>
            )}
          </Button>

          {/* OAuth Divider */}
          <div className='relative my-2 text-center'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-border/40' />
            </div>
            <span className='relative rounded-full px-3 text-[10px] text-zinc-400 uppercase tracking-widest bg-[#161619] -translate-y-[2px]'>
              Spawn via External Matrix
            </span>
          </div>

          <div className='grid grid-cols-3 gap-3'>
            <Button
              type='button'
              variant='outline'
              aria-label='Sign up with Google'
              onClick={() => toast.success("OAuth Hub Active")}
              className='h-11 rounded-xl border-border/60 bg-muted/5 hover:bg-muted/20 text-xs font-medium cursor-pointer transition-all'
            >
              <svg className='size-4 shrink-0' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c1.61-1.48 2.53-3.67 2.53-6.24z'
                />
                <path
                  fill='#4caf50'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#ffc107'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22l.81-.63z'
                />
                <path
                  fill='#f44336'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
                />
              </svg>
            </Button>
            <Button
              type='button'
              variant='outline'
              aria-label='Sign up with GitHub'
              onClick={() => toast.success("OAuth Hub Active")}
              className='h-11 rounded-xl border-border/60 bg-muted/5 hover:bg-muted/20 text-xs font-medium cursor-pointer transition-all'
            >
              <svg
                className='size-4 shrink-0'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 1.99 1.087 2.475.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z'
                />
              </svg>
            </Button>
            <Button
              type='button'
              variant='outline'
              aria-label='Sign up with Apple'
              onClick={() => toast.success("OAuth Hub Active")}
              className='h-11 rounded-xl border-border/60 bg-muted/5 hover:bg-muted/20 text-xs font-medium cursor-pointer transition-all'
            >
              <svg
                className='size-4 shrink-0'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.07 2.47.3 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42.14-1.08 1.83zM15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.37-.6.63-1.12 1.77-1.28 2.87 1.07.08 2.17-.37 2.83-1.18z' />
              </svg>
            </Button>
          </div>

          <div className='text-center pt-2 text-xs text-zinc-400'>
            Already holding a secure interface node?{" "}
            <Link
              href='/auth/login'
              className='text-primary font-bold hover:underline cursor-pointer transition-all'
            >
              Authorize Session
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
