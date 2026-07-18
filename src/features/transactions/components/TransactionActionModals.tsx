// src/features/transactions/components/TransactionActionModals.tsx
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Loader2, UploadCloud, FileSpreadsheet } from "lucide-react";

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

import { TRANSACTIONS_TYPES, NETWORKS } from "../schemas/transaction.schema";

import { useTransactionModals } from "../hooks/useTransactionModals";

export type TransactionActionType =
  | "record"
  | "edit"
  | "delete"
  | "import"
  | null;

interface TransactionActionModalsProps {
  type: TransactionActionType;
  isOpen: boolean;
  onClose: () => void;
  transactionId?: string;
}

export function TransactionActionModals({
  type,
  isOpen,
  onClose,
  transactionId,
}: TransactionActionModalsProps) {
  const {
    form,
    isPending,
    isDelete,
    isImport,
    onSubmit,
    handleImportSubmit,
    handleDeleteSubmit,
  } = useTransactionModals(type, isOpen, onClose);

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
            {type === "record" && "Record New Entry"}
            {type === "edit" && "Edit Transaction"}
            {type === "delete" && "Delete Record"}
            {type === "import" && "Import CSV Data"}
          </DialogTitle>
          <DialogDescription className='text-xs'>
            {isDelete &&
              "Are you sure you want to permanently delete this record?"}
            {isImport &&
              "Upload your exchange CSV file to sync history automatically."}
            {(type === "record" || type === "edit") &&
              "Fill in the details below to update the ledger."}
          </DialogDescription>
        </DialogHeader>

        <div className='py-2'>
          {/* 🔴 Delete mode */}
          {isDelete && (
            <div className='flex justify-end gap-3 mt-4'>
              <Button
                variant='outline'
                onClick={onClose}
                disabled={isPending}
                className='rounded-xl'
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                disabled={isPending}
                onClick={handleDeleteSubmit}
                className='rounded-xl'
              >
                {isPending ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  "Confirm Deletion"
                )}
              </Button>
            </div>
          )}

          {/* 🟢 Import mode */}
          {isImport && (
            <div className='space-y-6 mt-2'>
              <div className='border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group'>
                <div className='p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform'>
                  <UploadCloud className='size-6' />
                </div>
                <p className='text-sm font-semibold text-foreground'>
                  Click to upload CSV
                </p>
                <p className='text-xs text-muted-foreground mt-1 text-center'>
                  or drag and drop your file here
                  <br />
                  (Max 5MB)
                </p>
              </div>
              <div className='flex justify-end gap-3'>
                <Button
                  variant='outline'
                  onClick={onClose}
                  disabled={isPending}
                  className='rounded-xl'
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImportSubmit}
                  disabled={isPending}
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 size-4 animate-spin' />{" "}
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className='mr-2 size-4' /> Sync Data
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          {/* 🔵 Record and Edit mode (standard form) */}
          {(type === "record" || type === "edit") && (
            <form id='tx-form' onSubmit={onSubmit}>
              <FieldGroup className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <Controller
                    name='type'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase '>
                          Tx Type
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <SelectTrigger
                            aria-invalid={fieldState.invalid}
                            className='h-10 rounded-xl border-border bg-muted/10 text-xs focus:ring-1 focus:ring-primary'
                          >
                            <SelectValue placeholder='e.g., Deposit' />
                          </SelectTrigger>
                          <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                            {TRANSACTIONS_TYPES.map((t) => (
                              <SelectItem
                                key={t}
                                value={t}
                                className='text-xs rounded-lg'
                              >
                                {t}
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

                  <Controller
                    name='network'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase '>
                          Network
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isPending}
                        >
                          <SelectTrigger
                            aria-invalid={fieldState.invalid}
                            className='h-10 rounded-xl border-border bg-muted/10 text-xs focus:ring-1 focus:ring-primary'
                          >
                            <SelectValue placeholder='Network' />
                          </SelectTrigger>
                          <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                            {NETWORKS.map((n) => (
                              <SelectItem
                                key={n}
                                value={n}
                                className='text-xs rounded-lg'
                              >
                                {n}
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
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <Controller
                    name='assetSymbol'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase '>
                          Symbol
                        </FieldLabel>
                        <Input
                          {...field}
                          placeholder='BTC'
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

                  <Controller
                    name='amount'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className='text-[11px] font-medium text-muted-foreground uppercase '>
                          Amount
                        </FieldLabel>
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
                          className='h-10 rounded-xl border-border bg-muted/10 text-xs  focus-visible:ring-1 focus-visible:ring-primary [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield'
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
                </div>
              </FieldGroup>

              <div className='flex items-center justify-end gap-3 pt-6'>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={onClose}
                  disabled={isPending}
                  className='rounded-xl'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='sm'
                  disabled={isPending}
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 size-3.5 animate-spin' />{" "}
                      Processing
                    </>
                  ) : (
                    "Save Entry"
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
