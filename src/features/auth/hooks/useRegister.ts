// src/features/auth/hooks/useRegister.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation"; // 🚀 useSearchParams اضافه شد
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";

export function useRegister() {
  const searchParams = useSearchParams();

  // 🚀 استخراج callbackUrl
  const rawCallbackUrl = searchParams.get("callbackUrl");
  const callbackUrl =
    rawCallbackUrl &&
    rawCallbackUrl.startsWith("/") &&
    !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/dashboard";

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<
    "google" | "github" | "apple" | null
  >(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      newsletter: false,
    },
  });

  const passwordValue = form.watch("password") || "";
  const passwordRequirements = {
    hasMinLength: passwordValue.length >= 8,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecial: /[^A-Za-z0-9]/.test(passwordValue),
  };
  const passwordStrengthScore =
    Object.values(passwordRequirements).filter(Boolean).length;

  const handleOAuth = async (provider: "google" | "github" | "apple") => {
    if (provider === "apple") {
      toast.info("Apple Gateway Offline", {
        description:
          "Apple Matrix Gateway is currently undergoing maintenance. Please use Google or GitHub.",
      });
      return;
    }

    setOauthLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl, // 🚀 هدایت هوشمند پس از ثبت‌نام با شبکه اجتماعی
      });
    } catch (error) {
      toast.error("OAuth Matrix Failed", {
        description: `Failed to initialize external node via ${provider}.`,
      });
      setOauthLoading(null);
    }
  };

  // const onSubmit = form.handleSubmit(async (values) => {
  //   await authClient.signUp.email(
  //     {
  //       email: values.email,
  //       password: values.password,
  //       name: values.fullName,
  //     },
  //     {
  //       onRequest: () => setIsPending(true),
  //       onSuccess: () => {
  //         setIsSuccess(true);
  //         toast.success("Master Key Generated", {
  //           description: "Welcome to the Nexus cluster.",
  //         });
  //         setTimeout(() => router.push(callbackUrl), 2500); // 🚀 هدایت هوشمند پس از ثبت‌نام
  //       },
  //       onError: (ctx) => {
  //         setIsPending(false);
  //         const errorMsg = ctx.error.message.toLowerCase();
  //         const isUserExists =
  //           errorMsg.includes("user already exists") ||
  //           errorMsg.includes("already in use");
  //         if (isUserExists) {
  //           form.setError("email", {
  //             type: "manual",
  //             message: "Identity node already registered.",
  //           });
  //           form.setFocus("email");
  //         }
  //         toast.error("Node Initialization Failed", {
  //           description: isUserExists
  //             ? "This communication mail is already linked to an active cluster."
  //             : ctx.error.message,
  //         });
  //       },
  //     },
  //   );
  // });

  const onSubmit = form.handleSubmit(async (values) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.fullName,
        callbackURL: callbackUrl, // بعد از تایید ایمیل بره این صفحه
        newsletter: values.newsletter, // 🚀 ارسال تیک خبرنامه به دیتابیس
        termsAcceptedAt: new Date(), // 🚀 ثبت زمان تایید قوانین سیستم
      },
      {
        onRequest: () => setIsPending(true),
        onSuccess: () => {
          setIsPending(false);
          setIsSuccess(true);
          toast.success("Verification Handshake Dispatched", {
            description:
              "A cryptographic verification link has been sent to your email address.",
            duration: 8000,
          });
          // کاربر را نگه می‌داریم تا ایمیلش را تایید کند
        },
        onError: (ctx) => {
          setIsPending(false);
          const errorMessage = ctx.error?.message || "Registration failed.";
          const errorMsg = errorMessage.toLowerCase();
          const isUserExists =
            errorMsg.includes("user already exists") ||
            errorMsg.includes("already in use");
          if (isUserExists) {
            form.setError("email", {
              type: "manual",
              message: "Identity node already registered.",
            });
            form.setFocus("email");
          }
          toast.error("Node Initialization Failed", {
            description: isUserExists
              ? "This communication mail is already linked to an active cluster."
              : errorMessage,
          });
        },
      },
    );
  });

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
    oauthLoading,
    handleOAuth,
    onSubmit,
  };
}
