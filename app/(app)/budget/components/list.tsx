"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category, Subcategory } from "@/app/api/budget/dictionaries/route";
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
import { format } from "date-fns";
import { formatCurrency } from "@/lib/formatters/currency";
import { Operation } from "@/app/api/budget/transactions/route";
import { DeleteOperationDialog } from "./delete-operation-dialog";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const BudgetList = ({
  categories,
  subcategories,
  data: operations,
  fetchData: refresh,
}: {
  categories: Category[];
  subcategories: Subcategory[];
  data: Operation[];
  fetchData: () => Promise<void>;
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <DataTable data={operations} columns={columns} meta={{ categories, subcategories }} />
    </div>
  );

  // return (
  //   <div className="p-2">
  //     <Table>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead>Data</TableHead>
  //           <TableHead>Sklep</TableHead>
  //           <TableHead>Kategoria</TableHead>
  //           <TableHead>Kwota</TableHead>
  //           <TableHead>Info</TableHead>
  //           <TableHead className="text-right">Akcje</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       {
  //         <TableBody>
  //           {operations.map(operation => {
  //             const { amount, id, subcategoryId, categoryId, date, description } = operation;
  //             const subcategory = subcategories.find(({ id }) => id === +subcategoryId)?.name ?? "";
  //             const category = categories.find(({ id }) => id === +categoryId)?.name;

  //             const operationIdentifier = `${format(date, "yyyy-MM-dd")} ${category} ${subcategory} ${formatCurrency(amount)}`;

  //             return (
  //               <TableRow key={id}>
  //                 <TableCell>{format(date, "yyyy-MM-dd")}</TableCell>
  //                 <TableCell>{subcategory}</TableCell>
  //                 <TableCell>{category}</TableCell>
  //                 <TableCell>{formatCurrency(amount)}</TableCell>
  //                 <TableCell>{description}</TableCell>
  //                 <TableCell className="text-right">
  //                   <DropdownMenu>
  //                     <DropdownMenuTrigger asChild>
  //                       <Button variant={"ghost"} size={"icon"} className="size-8">
  //                         <MoreHorizontalIcon />
  //                         <span className="sr-only">Open menu</span>
  //                       </Button>
  //                     </DropdownMenuTrigger>
  //                     <DropdownMenuContent align="end">
  //                       <DropdownMenuItem>Edytuj</DropdownMenuItem>
  //                       <DropdownMenuSeparator />
  //                       <DropdownMenuItem
  //                         variant="destructive"
  //                         onSelect={e => {
  //                           e.preventDefault();
  //                           setDeleteOpen(true);
  //                         }}
  //                       >
  //                         Usuń
  //                       </DropdownMenuItem>
  //                       <DeleteOperationDialog
  //                         open={deleteOpen}
  //                         setOpen={setDeleteOpen}
  //                         operationIdentifier={operationIdentifier}
  //                         operationId={id}
  //                         refresh={refresh}
  //                       />
  //                     </DropdownMenuContent>
  //                   </DropdownMenu>
  //                 </TableCell>
  //               </TableRow>
  //             );
  //           })}
  //         </TableBody>
  //       }
  //     </Table>
  //   </div>
  // );
};
