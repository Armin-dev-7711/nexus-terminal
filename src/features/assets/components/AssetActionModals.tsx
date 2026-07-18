// src/features/assets/components/AssetActionModals.tsx
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Loader2, DollarSign, Coins } from "lucide-react";

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

import { NETWORKS } from "../schemas/asset.schema";
// Calling a dedicated hook
import { useAssetModals } from "../hooks/useAssetModals";

interface AssetActionModalsProps {
  type: "add" | "edit" | "delete" | null;
  isOpen: boolean;
  onClose: () => void;
  assetId?: string;
}

export function AssetActionModals({
  type,
  isOpen,
  onClose,
  assetId,
}: AssetActionModalsProps) {
  // Get all states and actions with one line of code
  const { form, isPending, isDelete, onSubmit, handleDelete } = useAssetModals(
    type,
    isOpen,
    onClose,
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isPending && !open && onClose()}
    >
      <DialogContent className='sm:max-w-[425px] border-border/60 bg-card/95 backdrop-blur-xl rounded-2xl'>
        <DialogHeader>
          <DialogTitle
            className={isDelete ? "text-destructive" : "text-foreground"}
          >
            {type === "add" && "Add New Asset"}
            {type === "edit" && "Edit Asset Details"}
            {type === "delete" && "Remove Asset"}
          </DialogTitle>
          <DialogDescription className='text-xs'>
            {isDelete
              ? "Are you sure you want to remove this asset? This action cannot be undone."
              : "Fill in the details below to update your portfolio ledger."}
          </DialogDescription>
        </DialogHeader>

        <div className='py-2'>
          {isDelete ? (
            <div className='flex justify-end gap-3 mt-4'>
              <Button
                variant='outline'
                onClick={onClose}
                disabled={isPending}
                className='rounded-xl border-border/60'
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                disabled={isPending}
                onClick={handleDelete}
                className='rounded-xl'
              >
                {isPending ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  "Confirm Deletion"
                )}
              </Button>
            </div>
          ) : (
            <form id='asset-form' onSubmit={onSubmit}>
              <FieldGroup className='space-y-4'>
                {/* 1. Network Select */}
                <Controller
                  name='network'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider '>
                        Asset Network
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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

                {/* 2. Ticker / Symbol */}
                <Controller
                  name='symbol'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider '>
                        Ticker / Symbol
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder='BTC, ETH, SOL...'
                        disabled={isPending}
                        aria-invalid={fieldState.invalid}
                        className='h-10 rounded-xl border-border bg-muted/10 text-xs  uppercase focus-visible:ring-1 focus-visible:ring-primary'
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className='text-[10px]'
                        />
                      )}
                    </Field>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  {/* 3. Holdings Volume */}
                  <Controller
                    name='amount'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider '>
                          Holdings Volume
                        </FieldLabel>
                        <InputGroup className='h-10 rounded-xl border border-border/60 bg-muted/10 overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all pr-1'>
                          <InputGroupAddon className='bg-transparent border-r-0 pr-2'>
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
                            className='border-0 bg-transparent text-xs  focus-visible:ring-0 shadow-none pl-2 [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
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

                  {/* 4. Purchase Price */}
                  <Controller
                    name='purchasePrice'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider '>
                          Buy Price (USD)
                        </FieldLabel>
                        <InputGroup className='h-10 rounded-xl border border-border/60 bg-muted/10 overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all pr-1'>
                          <InputGroupAddon className='bg-transparent border-r-0 pr-2'>
                            <InputGroupText>
                              <DollarSign className='size-4 text-muted-foreground/70' />
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
                            className='border-0 bg-transparent text-xs  focus-visible:ring-0 shadow-none pl-2 [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
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
                </div>
              </FieldGroup>

              {/* Footer Actions */}
              <div className='flex items-center justify-end gap-3 pt-6'>
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
                  form='asset-form'
                  size='sm'
                  disabled={isPending}
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs px-6 cursor-pointer shadow-md shadow-primary/10 transition-all'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 size-3.5 animate-spin' />{" "}
                      Processing
                    </>
                  ) : (
                    "Confirm Action"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
