// src/features/transactions/components/TransactionsClientRoot.tsx
"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsTableSkeleton } from "./TransactionsTableSkeleton";
import { TransactionActionType } from "./TransactionActionModals";

import { mockTransactionsData } from "../mocks/transactions.mock";
import { TransactionDetail } from "../types";

const TransactionReceipt = dynamic(
  () => import("./TransactionReceipt").then((mod) => mod.TransactionReceipt),
  { ssr: false },
);

const TransactionActionModals = dynamic(
  () =>
    import("./TransactionActionModals").then(
      (mod) => mod.TransactionActionModals,
    ),
  { ssr: false },
);

export function TransactionsClientRoot() {
  const [selectedTx, setSelectedTx] = React.useState<TransactionDetail | null>(
    null,
  );
  const [modalConfig, setModalConfig] = React.useState<{
    type: TransactionActionType;
    id?: string;
  }>({ type: null });

  const [isLoading, setIsLoading] = React.useState(true);
  const [transactions, setTransactions] = React.useState<TransactionDetail[]>(
    [],
  );

  React.useEffect(() => {
    let mounted = true;
    const fetchTransactions = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (mounted) {
        setTransactions(mockTransactionsData);
        setIsLoading(false);
      }
    };
    fetchTransactions();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAction = (actionType: "edit" | "delete" | "view", id: string) => {
    if (actionType === "view") {
      const tx = transactions.find((t) => t.id === id);
      if (tx) setSelectedTx(tx);
    } else {
      setModalConfig({ type: actionType, id });
    }
  };

  return (
    <div className='flex-1 space-y-6 p-6 pt-8 md:p-8'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground'>
            Transaction History
          </h2>
          <p className='text-sm text-muted-foreground'>
            Review your complete ledger activity, deposits, withdrawals, and
            trades.
          </p>
        </div>
        <Button
          onClick={() => setModalConfig({ type: "record" })}
          className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl cursor-pointer w-full sm:w-auto sm:self-auto self-start shadow-md shadow-primary/10'
        >
          <Plus className='mr-2 size-4' /> Record Entry
        </Button>
      </div>

      {isLoading ? (
        <TransactionsTableSkeleton />
      ) : (
        <TransactionsTable
          columns={columns}
          data={transactions}
          onRowClick={(tx) => setSelectedTx(tx)}
          onAction={handleAction}
          onAddTransaction={() => setModalConfig({ type: "record" })}
          onImport={() => setModalConfig({ type: "import" })}
        />
      )}

      {selectedTx !== null && (
        <TransactionReceipt
          transaction={selectedTx}
          isOpen={selectedTx !== null}
          onClose={() => setSelectedTx(null)}
        />
      )}

      {modalConfig.type !== null && (
        <TransactionActionModals
          type={modalConfig.type}
          transactionId={modalConfig.id}
          isOpen={modalConfig.type !== null}
          onClose={() => setModalConfig({ type: null })}
        />
      )}
    </div>
  );
}
