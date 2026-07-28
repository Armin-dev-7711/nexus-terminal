// // src/features/auth/hooks/useLogin.ts
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";
// import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

// export function useLogin() {
//   const router = useRouter();
//   const [isPending, setIsPending] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isCapsLockActive, setIsCapsLockActive] = useState(false);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//   });

//   const checkCapsLock = (e: KeyboardEvent | React.KeyboardEvent) => {
//     setIsCapsLockActive(e.getModifierState("CapsLock"));
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => checkCapsLock(e);
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   const onSubmit = form.handleSubmit(async (values) => {
//     await authClient.signIn.email(
//       {
//         email: values.email,
//         password: values.password,
//         rememberMe: values.rememberMe,
//       },
//       {
//         onRequest: () => {
//           setIsPending(true);
//         },
//         onSuccess: () => {
//           setIsSuccess(true);
//           toast.success("Session Authorized", {
//             description:
//               "Secure connection established. Routing to terminal...",
//           });
//           setTimeout(() => router.push("/dashboard"), 2000);
//         },
//         onError: (ctx) => {
//           setIsPending(false);

//           // 🚀 Pro UX: پاک کردن پسورد اشتباه و برگرداندن فوکوس به اینپوت پسورد
//           form.setValue("password", "");
//           form.setFocus("password");

//           // 🚀 تشخیص ارور اشتباه بودن اطلاعات و ترجمه به ادبیات سایبری
//           const errorMsg = ctx.error.message.toLowerCase();
//           const isInvalidCreds =
//             errorMsg.includes("invalid") || errorMsg.includes("incorrect");

//           toast.error("Access Denied", {
//             description: isInvalidCreds
//               ? "Cryptographic signature mismatch. Please verify your credentials."
//               : ctx.error.message,
//           });
//         },
//       },
//     );
//   });

//   return {
//     form,
//     isPending,
//     showPassword,
//     setShowPassword: () => setShowPassword((prev) => !prev),
//     isCapsLockActive,
//     checkCapsLock,
//     isSuccess,
//     onSubmit,
//   };
// }

// // src/features/auth/hooks/useLogin.ts
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";
// import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

// export function useLogin() {
//   const router = useRouter();
//   const [isPending, setIsPending] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isCapsLockActive, setIsCapsLockActive] = useState(false);
//   // 🚀 استیت جدید برای مدیریت لودینگ دکمه‌های شبکه‌های اجتماعی
//   const [oauthLoading, setOauthLoading] = useState<
//     "google" | "github" | "apple" | null
//   >(null);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//   });

//   const checkCapsLock = (e: KeyboardEvent | React.KeyboardEvent) => {
//     setIsCapsLockActive(e.getModifierState("CapsLock"));
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => checkCapsLock(e);
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   const handleOAuth = async (provider: "google" | "github" | "apple") => {
//     // اگر کاربر اپل را انتخاب کرد، یک پیام شیک می‌دهیم و عملیات را متوقف می‌کنیم
//     if (provider === "apple") {
//       toast.info("Apple Gateway Offline", {
//         description:
//           "Apple Matrix Gateway is currently undergoing maintenance. Please use Google or GitHub.",
//       });
//       return;
//     }

//     setOauthLoading(provider);
//     try {
//       await authClient.signIn.social({
//         provider,
//         callbackURL: "/dashboard",
//       });
//     } catch (error) {
//       toast.error("OAuth Matrix Failed", {
//         description: `Failed to establish secure handshake with ${provider}.`,
//       });
//       setOauthLoading(null);
//     }
//   };

//   const onSubmit = form.handleSubmit(async (values) => {
//     await authClient.signIn.email(
//       {
//         email: values.email,
//         password: values.password,
//         rememberMe: values.rememberMe,
//       },
//       {
//         onRequest: () => setIsPending(true),
//         onSuccess: () => {
//           setIsSuccess(true);
//           toast.success("Session Authorized", {
//             description:
//               "Secure connection established. Routing to terminal...",
//           });
//           setTimeout(() => router.push("/dashboard"), 2000);
//         },
//         onError: (ctx) => {
//           setIsPending(false);
//           form.setValue("password", "");
//           form.setFocus("password");
//           const errorMsg = ctx.error.message.toLowerCase();
//           const isInvalidCreds =
//             errorMsg.includes("invalid") || errorMsg.includes("incorrect");
//           toast.error("Access Denied", {
//             description: isInvalidCreds
//               ? "Cryptographic signature mismatch. Please verify your credentials."
//               : ctx.error.message,
//           });
//         },
//       },
//     );
//   });

//   return {
//     form,
//     isPending,
//     showPassword,
//     setShowPassword: () => setShowPassword((prev) => !prev),
//     isCapsLockActive,
//     checkCapsLock,
//     isSuccess,
//     oauthLoading,
//     handleOAuth,
//     onSubmit,
//   };
// }

// src/features/auth/hooks/useLogin.ts
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation"; // 🚀 useSearchParams اضافه شد
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🚀 استخراج callbackUrl از URL (با مقدار پیش‌فرض /dashboard)
  const rawCallbackUrl = searchParams.get("callbackUrl");
  // 🛡️ رعایت امنیت: جلوگیری از Open Redirect (فقط آدرس‌های داخلی با / مجاز هستند)
  const callbackUrl =
    rawCallbackUrl &&
    rawCallbackUrl.startsWith("/") &&
    !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/dashboard";

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<
    "google" | "github" | "apple" | null
  >(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const checkCapsLock = (e: KeyboardEvent | React.KeyboardEvent) => {
    setIsCapsLockActive(e.getModifierState("CapsLock"));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => checkCapsLock(e);
    window.addEventListener("keydown", handleKeyDown);

    // 🚀 بازیابی ایمیل ذخیره‌شده و تیک "Remember host Node" از localStorage
    const savedEmail = localStorage.getItem("nexus_remember_email");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      form.setValue("rememberMe", true);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form]);

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
        callbackURL: callbackUrl, // 🚀 هدایت هوشمند پس از ورود با شبکه اجتماعی
      });
    } catch (error) {
      toast.error("OAuth Matrix Failed", {
        description: `Failed to establish secure handshake with ${provider}.`,
      });
      setOauthLoading(null);
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    // 🚀 ذخیره یا پاک‌سازی ایمیل در localStorage بر اساس انتخاب Remember host Node
    if (values.rememberMe) {
      localStorage.setItem("nexus_remember_email", values.email);
    } else {
      localStorage.removeItem("nexus_remember_email");
    }

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      },
      {
        onRequest: () => setIsPending(true),
        onSuccess: () => {
          setIsSuccess(true);
          toast.success("Session Authorized", {
            description:
              "Secure connection established. Routing to target node...",
          });
          setTimeout(() => router.push(callbackUrl), 2000); // 🚀 هدایت هوشمند پس از لاگین عادی
        },
        onError: (ctx) => {
          setIsPending(false);
          form.setValue("password", "");
          form.setFocus("password");
          const errorMessage =
            ctx.error?.message || "Invalid email or password.";
          const errorMsg = errorMessage.toLowerCase();
          const isInvalidCreds =
            errorMsg.includes("invalid") ||
            errorMsg.includes("incorrect") ||
            errorMsg.includes("credential") ||
            errorMsg.includes("password");
          toast.error("Access Denied", {
            description: isInvalidCreds
              ? "Invalid email or password. Please verify your credentials."
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
    isCapsLockActive,
    checkCapsLock,
    isSuccess,
    oauthLoading,
    handleOAuth,
    onSubmit,
  };
}
