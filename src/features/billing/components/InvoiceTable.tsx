// src/features/billing/components/InvoiceTable.tsx
"use client";

import * as React from "react";
import { Download } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Invoice } from "../types";

const columnHelper = createColumnHelper<Invoice>();

const columns = [
  columnHelper.accessor("id", {
    header: "Invoice ID",
    cell: (info) => (
      <span className='font-semibold text-foreground'>{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => (
      <span className='text-muted-foreground'>{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => <span className='font-bold'>{info.getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span className='inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold tracking-wide'>
        <span className='size-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]' />{" "}
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <div className='text-right'>Action</div>,
    cell: (info) => (
      <div className='text-right'>
        <Button
          variant='ghost'
          size='icon'
          aria-label={`Download Invoice ${info.row.original.id}`}
          className='size-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer transition-all'
          onClick={() =>
            toast.success("Downloading Record", {
              description: `Exporting ${info.row.original.id}.pdf to local system.`,
            })
          }
        >
          <Download className='size-4' />
        </Button>
      </div>
    ),
  }),
];

interface InvoiceTableProps {
  data: Invoice[];
}

export function InvoiceTable({ data }: InvoiceTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='overflow-x-auto w-full'>
      <table className='w-full text-left border-collapse  text-xs'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className='bg-muted/5 border-b border-border/30 text-muted-foreground font-medium uppercase tracking-wider text-[10px]'
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-5 px-6'>
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
        <tbody className='divide-y divide-border/20 text-foreground/80'>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='hover:bg-muted/5 transition-colors group'
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-5 px-6'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
