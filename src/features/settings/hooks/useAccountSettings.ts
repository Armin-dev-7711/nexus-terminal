// //  src/features/settings/hooks/useAccountSettings.ts
// "use client";

// import { useState, useTransition, ChangeEvent, useCallback } from "react";
// import { useForm, Resolver, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import * as React from "react";
// import { ShieldAlert } from "lucide-react";

// import { mockUserProfile } from "../mocks/settings.mock";
// import { accountSchema, AccountFormValues } from "../schemas/account.schema";

// export function useAccountSettings() {
//   const [isPending, startTransition] = useTransition();
//   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   // Equip the hook with the Zod form system and resolver
//   const form = useForm<AccountFormValues>({
//     resolver: zodResolver(accountSchema) as Resolver<AccountFormValues>,
//     defaultValues: {
//       firstName: mockUserProfile.firstName,
//       lastName: mockUserProfile.lastName,
//       email: mockUserProfile.email,
//     },
//   });

//   const onSubmit: SubmitHandler<AccountFormValues> = useCallback((data) => {
//     startTransition(async () => {
//       // Simulate the buffer client
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log("Updated Profile Data Index:", data);
//       toast.success("Profile Updated", {
//         description: "Your personal operational logs have been saved.",
//       });
//     });
//   }, []);

//   const handleDeleteAccount = useCallback(() => {
//     toast.error("Action Restricted", {
//       description:
//         "You cannot delete a portfolio with active funds. Withdraw assets first.",
//       icon: React.createElement(ShieldAlert, {
//         className: "size-4 text-destructive",
//       }),
//     });
//   }, []);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("File too large", {
//           description: "Maximum file size is 2MB.",
//         });
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => setAvatarPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUploadAvatar = () => {
//     startTransition(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       toast.success("Avatar Updated", {
//         description: "Your profile picture has been changed successfully.",
//       });
//       setIsAvatarModalOpen(false);
//     });
//   };

//   const handleRemoveAvatar = () => {
//     setAvatarPreview(null);
//     toast.info("Avatar Removed", {
//       description: "Your profile picture has been removed.",
//     });
//   };

//   return {
//     form,
//     isPending,
//     isAvatarModalOpen,
//     setIsAvatarModalOpen,
//     avatarPreview,
//     onSubmit: form.handleSubmit(onSubmit),
//     handleDeleteAccount,
//     handleFileChange,
//     handleUploadAvatar,
//     handleRemoveAvatar,
//   };
// }

// src/features/settings/hooks/useAccountSettings.ts
// "use client";

// import { useState, useTransition, ChangeEvent, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { ShieldAlert } from "lucide-react";
// import * as React from "react";

// import { accountSchema, AccountFormValues } from "../schemas/account.schema";
// import { useSettingsData } from "./useSettingsData";
// import { updateProfile } from "../actions/settings.actions";
// import { getPresignedUploadUrl } from "../actions/upload.actions";

// export function useAccountSettings() {
//   const { settings, isLoading, refetch } = useSettingsData();
//   const [isPending, startTransition] = useTransition();

//   const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   // راه‌اندازی فرم با مقادیر خالی (بعد از لود شدن دیتا، پر می‌شود)
//   const form = useForm<AccountFormValues>({
//     resolver: zodResolver(accountSchema),
//     defaultValues: { firstName: "", lastName: "", email: "" },
//   });

//   // 🚀 Sync مقادیر فرم با دیتای واقعی سرور
//   useEffect(() => {
//     if (settings) {
//       const names = settings.name?.split(" ") || ["", ""];
//       form.reset({
//         firstName: names[0] || "",
//         lastName: names.slice(1).join(" ") || "",
//         email: settings.email || "",
//       });
//       if (settings.image) setAvatarPreview(settings.image);
//     }
//   }, [settings, form]);

//   // 🚀 متد ذخیره پروفایل اصلی
//   const onSubmit = form.handleSubmit((data) => {
//     startTransition(async () => {
//       try {
//         const fullName = `${data.firstName} ${data.lastName}`.trim();
//         await updateProfile({ name: fullName, email: data.email });
//         await refetch(); // آپدیت کردن کَش Tanstack
//         toast.success("Profile Synchronized", {
//           description: "Your identity matrix has been updated.",
//         });
//       } catch (error) {
//         toast.error("Sync Failed", {
//           description: "Could not update profile.",
//         });
//       }
//     });
//   });

//   // هندل کردن انتخاب عکس
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         toast.error("Payload too large", {
//           description: "Maximum file size is 2MB.",
//         });
//         return;
//       }
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setAvatarPreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   // 🚀 آپلود حرفه‌ای عکس با S3 Pre-signed URL
//   const handleUploadAvatar = async () => {
//     if (!selectedFile) return;

//     startTransition(async () => {
//       try {
//         // ۱. گرفتن لینک امن آپلود از سرور ما
//         const { signedUrl, publicUrl } = await getPresignedUploadUrl(
//           selectedFile.type,
//           selectedFile.size,
//         );

//         // ۲. ارسال عکس به صورت مستقیم به S3 (بدون درگیری سرور اصلی)
//         const uploadResponse = await fetch(signedUrl, {
//           method: "PUT",
//           body: selectedFile,
//           headers: { "Content-Type": selectedFile.type },
//         });

//         if (!uploadResponse.ok) throw new Error("S3 Upload Failed");

//         // ۳. ذخیره لینک جدید در دیتابیس خودمان
//         await updateProfile({
//           name: settings?.name || "",
//           email: settings?.email || "",
//           image: publicUrl,
//         });
//         await refetch();

//         toast.success("Avatar Updated", {
//           description: "Profile picture securely uploaded to cloud node.",
//         });
//         setIsAvatarModalOpen(false);
//       } catch (error) {
//         toast.error("Upload Matrix Error", {
//           description: "Failed to transfer image payload.",
//         });
//       }
//     });
//   };

//   const handleRemoveAvatar = () => {
//     setAvatarPreview(null);
//     setSelectedFile(null);
//     toast.info("Avatar Queued for Removal", {
//       description: "Save profile to finalize.",
//     });
//   };

//   const handleDeleteAccount = React.useCallback(() => {
//     toast.error("Action Restricted", {
//       description:
//         "You cannot delete a portfolio with active funds. Withdraw assets first.",
//       icon: React.createElement(ShieldAlert, {
//         className: "size-4 text-destructive",
//       }),
//     });
//   }, []);

//   return {
//     form,
//     isPending,
//     isLoadingSettings: isLoading, // برای نمایش لودینگ اولیه
//     isAvatarModalOpen,
//     setIsAvatarModalOpen,
//     avatarPreview,
//     onSubmit,
//     handleDeleteAccount,
//     handleFileChange,
//     handleUploadAvatar,
//     handleRemoveAvatar,
//   };
// }

// src/features/settings/hooks/useAccountSettings.ts
"use client";

import {
  useState,
  useTransition,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
import * as React from "react";

import { accountSchema, AccountFormValues } from "../schemas/account.schema";
import { useSettingsData } from "./useSettingsData";
import { updateProfile } from "../actions/settings.actions";
import { getPresignedUploadUrl } from "../actions/upload.actions";
import { useQueryClient } from "@tanstack/react-query";

export function useAccountSettings() {
  const queryClient = useQueryClient();
  const { settings, isLoading, refetch } = useSettingsData();
  const [isPending, startTransition] = useTransition();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  // 🚀 حل ارور React/ESLint: آپدیت فرم بدون صدا زدن مستقیم setStateهای اضافی
  useEffect(() => {
    if (settings) {
      const names = settings.name?.split(" ") || ["", ""];
      form.reset({
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        email: settings.email || "",
      });
    }
  }, [settings, form]);

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      try {
        const fullName = `${data.firstName} ${data.lastName}`.trim();
        await updateProfile({ name: fullName, email: data.email });
        await refetch();
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        toast.success("Profile Synchronized", {
          description: "Your identity matrix has been updated.",
        });
      } catch {
        toast.error("Sync Failed", {
          description: "Could not update profile.",
        });
      }
    });
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Payload too large", {
          description: "Maximum file size is 2MB.",
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) return;

    startTransition(async () => {
      try {
        const { signedUrl, publicUrl } = await getPresignedUploadUrl(
          selectedFile.type,
          selectedFile.size,
        );

        const uploadResponse = await fetch(signedUrl, {
          method: "PUT",
          body: selectedFile,
          headers: { "Content-Type": selectedFile.type },
        });

        if (!uploadResponse.ok) throw new Error("S3 Upload Failed");

        await updateProfile({
          name: settings?.name || "",
          email: settings?.email || "",
          image: publicUrl,
        });
        await refetch();
        queryClient.invalidateQueries({ queryKey: ["notifications"] });

        toast.success("Avatar Updated", {
          description: "Profile picture securely uploaded to cloud node.",
        });
        setIsAvatarModalOpen(false);
      } catch (err) {
        console.log(err);
        toast.error("Upload Matrix Error", {
          description: "Failed to transfer image payload.",
        });
      }
    });
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setSelectedFile(null);
    toast.info("Avatar Queued for Removal", {
      description: "Save profile to finalize.",
    });
  };

  const handleDeleteAccount = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    toast.error("Action Restricted", {
      description:
        "You cannot delete a portfolio with active funds. Withdraw assets first.",
      icon: React.createElement(ShieldAlert, {
        className: "size-4 text-destructive",
      }),
    });
  }, []);

  // 🚀 مقدار نهایی آواتار به صورت هوشمند محاسبه می‌شود (بدون نیاز به setState در Effect)
  const currentAvatar = avatarPreview || settings?.image || null;

  return {
    form,
    isPending,
    isLoadingSettings: isLoading,
    isAvatarModalOpen,
    setIsAvatarModalOpen,
    avatarPreview: currentAvatar,
    onSubmit,
    handleDeleteAccount,
    handleFileChange,
    handleUploadAvatar,
    handleRemoveAvatar,
  };
}
