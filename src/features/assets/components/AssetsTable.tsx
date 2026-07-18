"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Inbox,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { AssetsToolbar } from "./AssetsToolbar";

interface AssetsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (asset: TData) => void;
  onAction?: (type: "edit" | "delete", assetId: string) => void;
  onAddAsset?: () => void;
}

export function AssetsTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  onAction,
  onAddAsset,
}: AssetsTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onAction,
    },
    // Default pagination settings
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-x-auto'>
      <CardContent className='p-4 sm:p-6 flex flex-col gap-4'>
        {/* Top toolbar */}
        <AssetsToolbar table={table} />

        {/* Main table container */}
        <div className='rounded-xl border border-border/40 overflow-x-auto bg-muted/5'>
          <Table className='w-full min-w-175'>
            <TableHeader className='bg-muted/10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className='border-border/40 hover:bg-transparent'
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider  h-11 py-2'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                    className='border-border/20 hover:bg-muted/10 transition-colors data-[state=selected]:bg-primary/5 cursor-pointer'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='py-3'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-64 text-center'
                  >
                    {/* Professional and Actionable Empty State */}
                    <div className='flex flex-col items-center justify-center text-muted-foreground gap-4 py-8'>
                      <div className='relative flex items-center justify-center'>
                        <div className='absolute inset-0 bg-primary/10 blur-2xl rounded-full' />
                        <div className='relative size-16 rounded-2xl bg-muted/20 border border-border/40 flex items-center justify-center shadow-inner'>
                          <Inbox className='size-6 text-muted-foreground/80' />
                        </div>
                      </div>
                      <div className='space-y-1.5 text-center max-w-sm'>
                        <p className='text-base font-semibold text-foreground'>
                          No assets found
                        </p>
                        <p className='text-xs text-muted-foreground leading-relaxed'>
                          Your portfolio ledger is currently empty or no assets
                          match your filter criteria.
                        </p>
                      </div>

                      {/* Button to open modal directly from Empty State */}
                      <Button
                        onClick={onAddAsset}
                        variant='outline'
                        size='sm'
                        className='mt-2 rounded-xl border-border/60 hover:bg-muted/30 hover:text-foreground transition-all cursor-pointer'
                      >
                        <Plus className='size-4 mr-2' />
                        Add New Asset
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination and selection state */}
        {/* We changed the container to flex-col-reverse on mobile and sm:flex-row on large size */}
        <div className='flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-2 pt-2'>
          {/* Selected rows counter */}
          <div className='text-xs text-muted-foreground  text-center sm:text-left w-full sm:w-auto'>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          {/* Pagination controllers */}
          <div className='flex items-center gap-4 lg:gap-6 w-full sm:w-auto justify-between sm:justify-end'>
            <div className='flex items-center justify-center text-xs font-medium text-muted-foreground '>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className='flex items-center gap-1.5'>
              <Button
                variant='outline'
                className='hidden size-8 p-0 lg:flex rounded-lg border-border/60 bg-muted/10 hover:bg-muted/30'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <ChevronsLeft className='size-4' />
              </Button>
              <Button
                variant='outline'
                className='size-8 p-0 rounded-lg border-border/60 bg-muted/10 hover:bg-muted/30'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeft className='size-4' />
              </Button>
              <Button
                variant='outline'
                className='size-8 p-0 rounded-lg border-border/60 bg-muted/10 hover:bg-muted/30'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRight className='size-4' />
              </Button>
              <Button
                variant='outline'
                className='hidden size-8 p-0 lg:flex rounded-lg border-border/60 bg-muted/10 hover:bg-muted/30'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <ChevronsRight className='size-4' />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
