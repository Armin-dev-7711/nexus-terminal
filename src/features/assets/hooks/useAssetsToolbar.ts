// src/features/assets/hooks/useAssetsToolbar.ts
"use client";

import { useCallback } from "react";
import { Table } from "@tanstack/react-table";

export function useAssetsToolbar<TData>(table: Table<TData>) {
  const handleExportCSV = useCallback(() => {
    const rows = table.getFilteredRowModel().rows;
    if (rows.length === 0) return;

    const headers = table
      .getFlatHeaders()
      .map((h) => h.id)
      .filter((id) => id !== "select" && id !== "actions");

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const value = row.getValue(header);
            return typeof value === "object"
              ? JSON.stringify(value)
              : `"${value}"`;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `assets_report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [table]);

  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const handleReset = useCallback(() => {
    table.resetColumnFilters();
    table.setGlobalFilter(undefined);
  }, [table]);

  return { handleExportCSV, isFiltered, handleReset };
}
