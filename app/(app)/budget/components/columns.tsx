"use client";

import { Category, Subcategory } from "@/app/api/budget/dictionaries/route";
import { Operation } from "@/app/api/budget/transactions/route";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/formatters/currency";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

type Meta = { categories: Category[]; subcategories: Subcategory[] };

export const columns: ColumnDef<Operation>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Data
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => format(new Date(getValue() as string), "yyyy-MM-dd"),
  },
  {
    accessorKey: "categoryId",
    header: "Kategoria",
    cell: ({ table, getValue }) => {
      const val = getValue();
      if (!val) return "";
      const { categories } = table.options.meta as Meta;
      const category = categories.find(r => r.id == val);
      return category?.name;
    },
  },
  {
    accessorKey: "subcategoryId",
    header: "Podkategoria",
    cell: ({ table, getValue }) => {
      const val = getValue();
      if (!val) return "";
      const { subcategories } = table.options.meta as Meta;
      const subcategory = subcategories.find(r => r.id == val);
      return subcategory?.name;
    },
  },
  { accessorKey: "amount", header: "Kwota", cell: ({ row }) => formatCurrency(row.getValue("amount")) },
  { accessorKey: "description", header: "Komentarz" },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id.toString())}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
