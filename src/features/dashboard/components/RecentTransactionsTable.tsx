"use client";

import * as React from "react";
import { History, CheckCircle2 } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionTable } from "../hooks/useTransactionTable";

export function RecentTransactionsTable() {
  const { table, data } = useTransactionTable();

  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm'>
      <CardHeader className='flex flex-row items-center gap-2 pb-3'>
        <History className='size-4 text-muted-foreground' />
        <div>
          <CardTitle className='text-sm font-semibold text-foreground'>
            Recent Activity Log
          </CardTitle>
          <p className='text-xs text-muted-foreground mt-0.5'>
            The latest transaction and ledger funding operations.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile Layout */}
        <div className='block lg:hidden space-y-3'>
          {data.map((tx) => (
            <div
              key={tx.id}
              className='flex flex-col gap-3 p-3.5 rounded-xl border border-border/40 bg-muted/10'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md  text-[10px] font-semibold ${tx.type === "Buy" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"}`}
                  >
                    {tx.type}
                  </span>
                  <span className='text-xs font-bold  text-foreground'>
                    {tx.asset}
                  </span>
                </div>
                <span className='inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400'>
                  <CheckCircle2 className='size-3' />
                  <span>{tx.status}</span>
                </span>
              </div>
              <div className='grid grid-cols-2 gap-2 border-t border-border/20 pt-2.5 text-xs'>
                <div>
                  <p className='text-[10px] text-muted-foreground uppercase '>
                    Amount
                  </p>
                  <p className='font-medium text-muted-foreground  mt-0.5'>
                    {tx.amount}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-[10px] text-muted-foreground uppercase '>
                    Total Value
                  </p>
                  <p className='font-bold text-foreground  mt-0.5'>
                    {tx.value}
                  </p>
                </div>
              </div>
              <div className='text-[10px] text-muted-foreground/80  border-t border-border/10 pt-1.5'>
                {tx.date}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:block overflow-x-auto w-full'>
          <table className='w-full text-left border-collapse'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className='border-b border-border/40 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider '
                >
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className='pb-3 pl-2'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='divide-y divide-border/20 text-xs'>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:bg-muted/10 transition-colors'
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='py-3 pl-2 vertical-middle'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
