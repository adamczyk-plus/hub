"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { currencyFormat } from "../../car/components/fill-up-card";

interface BudgetRecord {
  date: string;
  shop: string;
  amounts: number[];
}

interface FoodBudgetRecord extends BudgetRecord {
  n?: string;
}

export const BudgetList = () => {
  const columns = useMemo<ColumnDef<FoodBudgetRecord>[]>(
    () => [
      { accessorKey: "shop", header: () => <span>Sklep</span> },
      {
        accessorKey: "amounts",
        header: "Kwoty",
        cell: ({ getValue }) => {
          const value = getValue() as number[];
          return value.join(", ");
        },
      },
      {
        id: "total",
        header: "Suma",
        accessorFn: ({ amounts }) => amounts.reduce((acc, n) => acc + n, 0),
        cell: ({ getValue }) => currencyFormat(getValue() as number),
      },
    ],
    []
  );

  const [data] = useState<BudgetRecord[]>([
    { date: "", amounts: [12.47, 198.32, 4.85, 76.9, 249.12, 33.58, 160.04], shop: "Biedronka" },
    { date: "", amounts: [89.71, 5.26, 142.99, 217.63, 61.08, 190.44, 27.36, 104.75], shop: "Lidl" },
    { date: "", amounts: [8.91, 233.5, 54.19, 171.82, 95.07, 14.66, 120.38], shop: "Netto" },
    { date: "", amounts: [206.94, 68.55, 158.21, 3.74, 184.09, 41.67, 225.88, 99.3], shop: "Auchan" },
  ]);

  return <List data={data} columns={columns} />;
};

function List({ data, columns }: { data: BudgetRecord[]; columns: ColumnDef<BudgetRecord>[] }) {
  const table = useReactTable({ columns, data, debugTable: true, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="p-2">
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
          {table.getRowModel().rows.length ? (
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
  );
}
