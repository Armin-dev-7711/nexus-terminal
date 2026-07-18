"use client";

import { useState, useTransition, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerSchema, RegisterFormValues } from "../schemas/register.schema";

export function useRegister() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Independent management of password display
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false as unknown as true,
      newsletter: false,
    },
  });

  // Live password monitoring for checklist
  const watchedPassword = form.watch("password") || "";

  // Live analysis of password rules
  const passwordRequirements = useMemo(() => {
    return {
      hasMinLength: watchedPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(watchedPassword),
      hasNumber: /[0-9]/.test(watchedPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(watchedPassword),
    };
  }, [watchedPassword]);

  // Calculate the password strength rating (between 0 and 4)
  const passwordStrengthScore = useMemo(() => {
    return Object.values(passwordRequirements).filter(Boolean).length;
  }, [passwordRequirements]);

  const onSubmit = useCallback(
    (data: RegisterFormValues) => {
      startTransition(async () => {
        // Simulate the creation of a gate and primary key in the database
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Master Node Core Spawned Successfully:", data);
        setIsSuccess(true);

        toast.success("Identity Spawned", {
          description:
            "Master key generated. Please verify your terminal email.",
        });

        setTimeout(() => {
          router.push("/auth/login"); // Redirect after success
        }, 1500);
      });
    },
    [router],
  );

  return {
    form,
    isPending,
    showPassword,
    setShowPassword: () => setShowPassword((prev) => !prev),
    showConfirmPassword,
    setShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
    isSuccess,
    passwordRequirements,
    passwordStrengthScore,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
