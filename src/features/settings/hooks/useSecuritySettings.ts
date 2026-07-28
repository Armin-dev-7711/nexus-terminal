// src/features/settings/hooks/useSecuritySettings.ts
"use client";

import { useState, useTransition, useCallback } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { securitySchema, SecurityFormValues } from "../schemas/security.schema";

export function useSecuritySettings() {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Launch the platform security form chassis
  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema) as Resolver<SecurityFormValues>,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SecurityFormValues> = useCallback(
    (data) => {
      startTransition(async () => {
        // Simulate request to server security vault
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Password Mutation Buffer Captured:", data);

        queryClient.invalidateQueries({ queryKey: ["notifications"] });

        toast.success("Password Updated", {
          description:
            "Your account credentials have been successfully encrypted and cycled.",
        });

        form.reset(); // Reset inputs after successful change
      });
    },
    [form, queryClient],
  );

  const handleRevokeSession = useCallback((deviceId: string) => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    toast.success("Session Revoked", {
      description: `Device node [${deviceId}] has been forcefully logged out.`,
    });
  }, [queryClient]);

  const toggleTwoFactor = useCallback(() => {
    setTwoFactorEnabled((prev) => {
      const nextState = !prev;
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(nextState ? "2FA Enabled" : "2FA Disabled", {
        description: "Your multifactor validation layer has been updated.",
      });
      return nextState;
    });
  }, [queryClient]);

  return {
    form,
    isPending,
    twoFactorEnabled,
    onSubmit: form.handleSubmit(onSubmit),
    handleRevokeSession,
    toggleTwoFactor,
  };
}
