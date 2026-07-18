//  src/features/settings/hooks/useAccountSettings.ts
"use client";

import { useState, useTransition, ChangeEvent, useCallback } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as React from "react";
import { ShieldAlert } from "lucide-react";

import { mockUserProfile } from "../mocks/settings.mock";
import { accountSchema, AccountFormValues } from "../schemas/account.schema";

export function useAccountSettings() {
  const [isPending, startTransition] = useTransition();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Equip the hook with the Zod form system and resolver
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema) as Resolver<AccountFormValues>,
    defaultValues: {
      firstName: mockUserProfile.firstName,
      lastName: mockUserProfile.lastName,
      email: mockUserProfile.email,
    },
  });

  const onSubmit: SubmitHandler<AccountFormValues> = useCallback((data) => {
    startTransition(async () => {
      // Simulate the buffer client
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Updated Profile Data Index:", data);
      toast.success("Profile Updated", {
        description: "Your personal operational logs have been saved.",
      });
    });
  }, []);

  const handleDeleteAccount = useCallback(() => {
    toast.error("Action Restricted", {
      description:
        "You cannot delete a portfolio with active funds. Withdraw assets first.",
      icon: React.createElement(ShieldAlert, {
        className: "size-4 text-destructive",
      }),
    });
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Maximum file size is 2MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Avatar Updated", {
        description: "Your profile picture has been changed successfully.",
      });
      setIsAvatarModalOpen(false);
    });
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    toast.info("Avatar Removed", {
      description: "Your profile picture has been removed.",
    });
  };

  return {
    form,
    isPending,
    isAvatarModalOpen,
    setIsAvatarModalOpen,
    avatarPreview,
    onSubmit: form.handleSubmit(onSubmit),
    handleDeleteAccount,
    handleFileChange,
    handleUploadAvatar,
    handleRemoveAvatar,
  };
}
