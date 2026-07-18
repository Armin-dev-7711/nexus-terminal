"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Loader2, Coins, Wallet } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";

import { NETWORKS } from "../schemas/dashboard.schema";

// 🔥 Calling a custom hook to manage all form states and logic
import { useDashboardModals } from "../hooks/useDashboardModals";

interface DashboardModalsProps {
  activeModal: "add" | "transfer" | null;
  onClose: () => void;
}

export function DashboardModals({
  activeModal,
  onClose,
}: DashboardModalsProps) {
  // All Zod, Submit and Transition logic is taken from the hook
  const { form, isPending, isTransfer, onSubmit } = useDashboardModals(
    activeModal,
    onClose,
  );

  return (
    <Dialog
      open={activeModal !== null}
      onOpenChange={(isOpen) => !isPending && !isOpen && onClose()}
    >
      <DialogContent className='sm:max-w-105 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-6'>
        <DialogHeader>
          <DialogTitle className='text-base font-bold text-foreground'>
            {activeModal === "add" ? "Add Funds to Ledger" : "Transfer Capital"}
          </DialogTitle>
          <DialogDescription className='text-xs text-muted-foreground mt-1'>
            {activeModal === "add"
              ? "Deposit new capital into your primary portfolio ledger."
              : "Execute a transfer across your registered networks."}
          </DialogDescription>
        </DialogHeader>

        <div className='py-2'>
          <form id='dashboard-action-form' onSubmit={onSubmit}>
            <FieldGroup className='space-y-4'>
              {/* 1. Select network */}
              <Controller
                name='network'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider'>
                      Asset Network
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                      disabled={isPending}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className='h-10 rounded-xl border-border bg-muted/10 text-xs focus:ring-1 focus:ring-primary focus:border-primary'
                      >
                        <SelectValue placeholder='Select network (e.g., Ethereum)' />
                      </SelectTrigger>
                      <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                        {NETWORKS.map((net) => (
                          <SelectItem
                            key={net}
                            value={net}
                            className='text-xs rounded-lg cursor-pointer focus:bg-muted/50'
                          >
                            {net}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-[10px]'
                      />
                    )}
                  </Field>
                )}
              />

              {/* 2. Quantity / Volume */}
              <Controller
                name='amount'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider'>
                      Volume / Amount
                    </FieldLabel>
                    <InputGroup className='h-10 rounded-xl border border-border/60 bg-muted/10 overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all'>
                      <InputGroupAddon className='bg-transparent border-r-0 pl-3'>
                        <InputGroupText>
                          <Coins className='size-4 text-muted-foreground/70' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        value={(field.value as string | number) ?? ""}
                        type='number'
                        step='any'
                        placeholder='0.00'
                        disabled={isPending}
                        aria-invalid={fieldState.invalid}
                        className='border-0 bg-transparent text-xs focus-visible:ring-0 shadow-none pl-2 [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-[10px]'
                      />
                    )}
                  </Field>
                )}
              />

              {/* 3. Conditional field: Destination address (only in Transfer mode) */}
              {isTransfer && (
                <Controller
                  name='destinationAddress'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider'>
                        Destination Address
                      </FieldLabel>
                      <InputGroup className='h-10 rounded-xl border border-border/60 bg-muted/10 overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all'>
                        <InputGroupAddon className='bg-transparent border-r-0 pl-3'>
                          <InputGroupText>
                            <Wallet className='size-4 text-muted-foreground/70' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder='0x...'
                          disabled={isPending}
                          aria-invalid={fieldState.invalid}
                          className='border-0 bg-transparent text-xs focus-visible:ring-0 shadow-none pl-2'
                        />
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px]'
                        />
                      )}
                    </Field>
                  )}
                />
              )}
            </FieldGroup>

            <div className='flex items-center justify-end gap-2 mt-6'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={onClose}
                disabled={isPending}
                className='rounded-xl text-xs cursor-pointer'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                form='dashboard-action-form'
                size='sm'
                disabled={isPending}
                className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs px-5 cursor-pointer shadow-md shadow-primary/10'
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 size-3.5 animate-spin' />
                    Processing
                  </>
                ) : (
                  "Confirm Action"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
