// src/features/dashboard/hooks/useDashboardModals.ts
"use client";

import { useTransition, useCallback, useEffect } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  dashboardActionSchema,
  DashboardActionFormValues,
} from "../schemas/dashboard.schema";

export function useDashboardModals(
  activeModal: "add" | "transfer" | null,
  onClose: () => void,
) {
  const isTransfer = activeModal === "transfer";
  const [isPending, startTransition] = useTransition();

  const form = useForm<DashboardActionFormValues>({
    resolver: zodResolver(
      dashboardActionSchema,
    ) as Resolver<DashboardActionFormValues>,
    defaultValues: {
      network: undefined,
      amount: "" as unknown as number,
      destinationAddress: "",
    },
  });

  useEffect(() => {
    if (activeModal === null) {
      form.reset();
    }
  }, [activeModal, form]);

  const onSubmit: SubmitHandler<DashboardActionFormValues> = useCallback(
    (data) => {
      startTransition(async () => {
        // Simulate server request
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success(isTransfer ? "Transfer Initiated" : "Funds Added", {
          description: isTransfer
            ? `Successfully initiated transfer on ${data.network}.`
            : `Successfully added funds via ${data.network}.`,
        });

        onClose();
      });
    },
    [isTransfer, onClose],
  );

  return {
    form,
    isPending,
    isTransfer,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
