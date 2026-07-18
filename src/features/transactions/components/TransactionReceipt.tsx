"use client";

import * as React from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  ExternalLink,
  Download,
  ReceiptText,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionDetail, TransactionStatus } from "../types";

interface TransactionReceiptProps {
  transaction: TransactionDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusConfig = (status: TransactionStatus) => {
  switch (status) {
    case "Completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      };
    case "Pending":
      return {
        icon: Clock,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
      };
    case "Failed":
      return {
        icon: XCircle,
        color: "text-destructive",
        bg: "bg-destructive/10",
        border: "border-destructive/20",
      };
  }
};

export function TransactionReceipt({
  transaction,
  isOpen,
  onClose,
}: TransactionReceiptProps) {
  if (!transaction) return null;

  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;
  const isDeposit = transaction.type === "Deposit";
  const prefix = isDeposit ? "+" : transaction.type === "Withdrawal" ? "-" : "";
  const txDate = new Date(transaction.date);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} Copied`, { description: "Copied to clipboard." });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[400px] p-0 overflow-hidden rounded-2xl border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl'>
        {/* Receipt header (Header) */}
        <div
          className={`p-6 pb-8 text-center flex flex-col items-center justify-center relative ${statusConfig.bg}`}
        >
          {/* Background light effect */}
          <div className='absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none' />

          <div className='relative z-10 flex flex-col items-center'>
            <div
              className={`size-12 rounded-full flex items-center justify-center mb-3 ${statusConfig.border} border bg-background/50 backdrop-blur-sm`}
            >
              <StatusIcon className={`size-6 ${statusConfig.color}`} />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground tracking-tight'>
              {prefix}
              {transaction.amount.toLocaleString()} {transaction.assetSymbol}
            </DialogTitle>
            <p className='text-xs text-muted-foreground  mt-1'>
              ≈ $
              {transaction.valueUsd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              USD
            </p>
          </div>
        </div>

        {/* Dotted separator line (paper receipt sense) */}
        <div className='relative h-px w-full bg-transparent'>
          <div className='absolute left-0 right-0 -top-2 flex justify-between px-[-8px]'>
            <div className='size-4 rounded-full bg-background -ml-2 border-r border-border/40' />
            <div className='size-4 rounded-full bg-background -mr-2 border-l border-border/40' />
          </div>
          <div className='absolute left-4 right-4 top-0 border-t-2 border-dashed border-border/60' />
        </div>

        {/* Transaction information body (Details) */}
        <div className='p-6 space-y-5'>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-muted-foreground uppercase tracking-wider '>
              Status
            </span>
            <span className={`font-semibold ${statusConfig.color}`}>
              {transaction.status}
            </span>
          </div>

          <div className='flex items-center justify-between text-xs'>
            <span className='text-muted-foreground uppercase tracking-wider '>
              Date & Time
            </span>
            <span className='font-medium text-foreground text-right'>
              {format(txDate, "MMM dd, yyyy")} <br />
              <span className='text-[10px] text-muted-foreground '>
                {format(txDate, "HH:mm:ss a")}
              </span>
            </span>
          </div>

          <div className='flex items-center justify-between text-xs'>
            <span className='text-muted-foreground uppercase tracking-wider '>
              Network
            </span>
            <span className='font-medium text-foreground'>
              {transaction.network}
            </span>
          </div>

          <div className='flex items-center justify-between text-xs'>
            <span className='text-muted-foreground uppercase tracking-wider '>
              Type
            </span>
            <span className='font-medium text-foreground'>
              {transaction.type}
            </span>
          </div>

          {transaction.feeUsd !== undefined && (
            <div className='flex items-center justify-between text-xs'>
              <span className='text-muted-foreground uppercase tracking-wider '>
                Network Fee
              </span>
              <span className=' text-foreground'>
                ${transaction.feeUsd.toFixed(2)}
              </span>
            </div>
          )}

          {/* Hash field with copy button */}
          <div className='pt-2 border-t border-border/40'>
            <div className='flex flex-col gap-2'>
              <span className='text-[10px] text-muted-foreground uppercase tracking-wider '>
                Transaction Hash
              </span>
              <div className='flex items-center justify-between bg-muted/20 border border-border/40 p-2 rounded-lg group'>
                <span className='text-[11px]  text-muted-foreground truncate w-[240px]'>
                  {transaction.txHash}
                </span>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-6 shrink-0 text-muted-foreground hover:text-foreground cursor-pointer'
                  onClick={() => handleCopy(transaction.txHash, "TxHash")}
                >
                  <Copy className='size-3' />
                </Button>
              </div>
            </div>
          </div>

          {transaction.destinationAddress && (
            <div className='flex flex-col gap-2'>
              <span className='text-[10px] text-muted-foreground uppercase tracking-wider '>
                Destination Address
              </span>
              <div className='flex items-center justify-between bg-muted/20 border border-border/40 p-2 rounded-lg group'>
                <span className='text-[11px]  text-muted-foreground truncate w-[240px]'>
                  {transaction.destinationAddress}
                </span>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-6 shrink-0 text-muted-foreground hover:text-foreground cursor-pointer'
                  onClick={() =>
                    handleCopy(
                      transaction.destinationAddress as string,
                      "Address",
                    )
                  }
                >
                  <Copy className='size-3' />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer and Actions */}
        <div className='p-4 bg-muted/10 border-t border-border/40 flex items-center gap-2'>
          <Button
            variant='outline'
            className='flex-1 rounded-xl text-xs h-9 cursor-pointer border-border/60 hover:bg-muted/30'
          >
            <Download className='mr-2 size-3.5' />
            PDF
          </Button>
          <Button className='flex-1 rounded-xl text-xs h-9 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10'>
            <ExternalLink className='mr-2 size-3.5' />
            Explorer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
