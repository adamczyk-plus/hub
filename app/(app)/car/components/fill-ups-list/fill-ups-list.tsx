"use client";

import { FillUpRecord } from "@/lib/db/schema/fill-up";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export const FillUpsList = ({ data }: { data: FillUpRecord[] }) => {
  const dataWithPrevs = useMemo(
    () => data.map((record, index) => ({ ...record, prev: data[index - 1] ?? null })),
    [data]
  );
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const table = useReactTable({
    data: dataWithPrevs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
  });

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex-- }))}
          disabled={!table.getCanPreviousPage()}
        >
          Wstecz
        </Button>
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex++ }))}
          disabled={!table.getCanNextPage()}
        >
          Dalej
        </Button>
      </div>
    </div>
  );
};
