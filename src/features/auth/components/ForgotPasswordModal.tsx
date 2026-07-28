// src/features/auth/components/ForgotPasswordModal.tsx
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Loader2,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/reset-password.schema";

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordModal({
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Reset state when modal is closed
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsPending(false);
        form.reset();
      }, 300);
    }
  }, [open, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/auth/reset-password",
      },
      {
        onRequest: () => setIsPending(true),
        onSuccess: () => {
          setIsPending(false);
          setIsSubmitted(true);
          toast.success("Reset Signal Dispatched", {
            description:
              "Cryptographic recovery link sent to your network email address.",
          });
        },
        onError: (ctx: { error: { message?: string } }) => {
          setIsPending(false);
          toast.error("Recovery Handshake Failed", {
            description:
              ctx.error?.message || "Failed to dispatch reset signal to node.",
          });
        },
      },
    );
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[420px] bg-[#121215]/95 border-border/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden'>
        {/* Glow ambient effect */}
        <div className='absolute -top-24 -left-24 size-48 bg-primary/10 rounded-full blur-3xl pointer-events-none' />

        {isSubmitted ? (
          /* Success Screen */
          <div className='flex flex-col items-center justify-center text-center py-4 space-y-4 animate-in fade-in zoom-in-95 duration-300'>
            <div className='p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(132,204,34,0.15)]'>
              <CheckCircle2 className='size-10 animate-pulse' />
            </div>

            <div className='space-y-1.5'>
              <h3 className='text-xl font-black text-foreground tracking-tight'>
                Signal Dispatched
              </h3>
              <p className='text-xs text-zinc-400 max-w-[280px] leading-relaxed'>
                A security override token has been dispatched to{" "}
                <span className='text-primary font-medium'>
                  {form.getValues("email")}
                </span>
              </p>
            </div>

            <div className='w-full p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2.5 text-left'>
              <ShieldCheck className='size-4 shrink-0 text-primary' />
              <span>
                Check your inbox and click the reset link to authenticate your new key.
              </span>
            </div>

            <Button
              type='button'
              onClick={() => onOpenChange(false)}
              className='w-full h-11 rounded-xl text-xs font-bold bg-muted/40 hover:bg-muted/60 text-foreground border border-border/40 transition-all cursor-pointer mt-2'
            >
              Return to Login Interface
            </Button>
          </div>
        ) : (
          /* Form Screen */
          <div className='space-y-6 relative z-10'>
            <DialogHeader className='text-center space-y-2'>
              <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-muted/30 border border-border/40 text-[10px] uppercase tracking-widest text-zinc-400 mx-auto w-fit'>
                <KeyRound className='size-3 text-primary animate-pulse' />
                <span>Security Key Recovery</span>
              </div>
              <DialogTitle className='text-2xl font-black tracking-tight text-foreground text-center'>
                Forgot Security Key?
              </DialogTitle>
              <DialogDescription className='text-xs text-zinc-400 text-center leading-relaxed'>
                Enter your network email address below to receive an emergency cryptographic key override token.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className='space-y-5'>
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
                      id='recovery-email'
                      type='email'
                      autoFocus
                      disabled={isPending}
                      placeholder=' '
                      className={cn(
                        "peer w-full h-12 pl-10 pr-4 bg-background/40 border border-border/60 rounded-xl text-xs text-foreground focus-visible:ring-1 focus-visible:ring-primary transition-all placeholder-transparent pt-4",
                        fieldState.invalid &&
                          "border-destructive focus-visible:ring-destructive",
                      )}
                    />
                    <label
                      htmlFor='recovery-email'
                      className='absolute left-10 top-3.5 z-10 text-xs text-zinc-400 pointer-events-none transition-all duration-200 origin-[0_0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]'
                    >
                      Network Email Address
                    </label>

                    {fieldState.invalid && (
                      <p className='absolute -bottom-5 left-1 text-[10px] text-red-400 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200'>
                        <AlertCircle className='size-3 shrink-0' />
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className='pt-2 flex gap-3'>
                <Button
                  type='button'
                  variant='outline'
                  disabled={isPending}
                  onClick={() => onOpenChange(false)}
                  className='flex-1 h-11 rounded-xl text-xs border-border/60 bg-muted/10 hover:bg-muted/30 cursor-pointer'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isPending}
                  className='flex-1 h-11 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(132,204,34,0.15)] transition-all cursor-pointer flex items-center justify-center gap-1.5'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='size-4 animate-spin' /> Dispatching...
                    </>
                  ) : (
                    <>
                      Send Token <ArrowRight className='size-4' />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
