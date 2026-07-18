//src/features/auth/hooks/useLogin.ts
"use client";

import { useState, useTransition, useCallback } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginSchema, LoginFormValues } from "../schemas/login.schema";

export function useLogin() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Advanced UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as Resolver<LoginFormValues>,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Native function to detect the keyboard Caps Lock button
  const checkCapsLock = useCallback((e: React.KeyboardEvent) => {
    if (typeof window !== "undefined") {
      const capsActive = e.getModifierState("CapsLock");
      setIsCapsLockActive(capsActive);
    }
  }, []);

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    (data) => {
      startTransition(async () => {
        // Simulate digital signature verification and authentication with server buffer
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Authentication secure hand-shake successful:", data);

        // Activate success animation
        setIsSuccess(true);
        toast.success("Access Granted", {
          description: "Welcome back to NEXUS Core Terminal.",
        });

        // Short delay to see the success animation and then redirect to the dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      });
    },
    [router],
  );

  return {
    form,
    isPending,
    showPassword,
    setShowPassword: () => setShowPassword((prev) => !prev),
    isCapsLockActive,
    checkCapsLock,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
