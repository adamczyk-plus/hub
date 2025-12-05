"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Refueling } from "./api/refuelings/route";

export const columns: ColumnDef<Refueling>[] = [
  { accessorKey: "date", header: "Data" },
  {
    accessorKey: "cost",
    header: "Koszt",
    cell: ({ row }) => {
      console.debug(row);
      const a: number = row.getValue("pricePerLiter");
      const b: number = row.getValue("liters");
      console.debug(a);
      console.debug(b);
      const c = a * b;
      return c.toFixed(2);
    },
  },
  { accessorKey: "pricePerLiter", header: "Cena za litr" },
  { accessorKey: "odometer", header: "Stan licznika" },
  { accessorKey: "liters", header: "Ilość" },
  { accessorKey: "notes", header: "Notatki" },
];
