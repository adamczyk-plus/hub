"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/app/api/budget/transactions/route";
import { Category, Store } from "@/app/api/budget/dictionaries/route";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTransaction } from "../actions/deleteTransaction";
import { UUID } from "crypto";

export const BudgetList = ({
  stores,
  categories,
  data,
  fetchData: refresh,
}: {
  stores: Store[];
  categories: Category[];
  data: Transaction[];
  fetchData: () => Promise<void>;
}) => {
  const handleDelete = async (id: UUID) => {
    await deleteTransaction(id);
    await refresh();
  };

  return (
    <div className="p-2">
      <Table>
        <TableCaption>Testowo</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sklep</TableHead>
            <TableHead>Kategoria</TableHead>
            <TableHead>Kwota</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ amount, id, storeId, categoryId }) => {
            const store = stores.find(({ id }) => id === storeId)?.name;
            const category = categories.find(({ id }) => id === categoryId)?.name;
            return (
              <TableRow key={id}>
                <TableCell>{store}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} size={"icon"} className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edytuj</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(id)} variant="destructive">
                        Usuń
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
