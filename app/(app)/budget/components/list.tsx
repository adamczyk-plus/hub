"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { currencyFormat } from "../../car/components/fill-up-card";
import { Transaction } from "@/app/api/budget/transactions/route";
import { Category, Store } from "@/app/api/budget/dictionaries/route";

export const BudgetList = ({
  stores,
  categories,
  data,
}: {
  stores: Store[];
  categories: Category[];
  data: Transaction[];
}) => {
  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "storeId",
        header: () => <span>Sklep</span>,
        cell: ({ getValue }) => {
          const store = stores.find(({ id }) => getValue() === id);
          return store?.name ?? "";
        },
      },
      { accessorKey: "amount", header: "Kwota", cell: ({ getValue }) => currencyFormat(getValue() as number) },
      {
        accessorKey: "categoryId",
        header: "Kategoria",
        cell: ({ getValue }) => {
          const category = categories.find(({ id }) => getValue() === id);
          return category?.name ?? "";
        },
      },
    ],
    [stores, categories],
  );

  return <List data={data} columns={columns} />;
};

function List({ data, columns }: { data: Transaction[]; columns: ColumnDef<Transaction>[] }) {
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
