"use client";

import { Refueling } from "@/app/api/refuelings/route";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Refueling>[] = [
  { accessorKey: "date", header: "Data" },
  {
    accessorKey: "cost",
    header: "Koszt",
    cell: ({ row }) => {
      const a: number = row.getValue("pricePerLiter");
      const b: number = row.getValue("liters");
      const c = a * b;
      return c.toFixed(2);
    },
  },
  { accessorKey: "pricePerLiter", header: "Cena za litr" },
  { accessorKey: "odometer", header: "Stan licznika" },
  { accessorKey: "liters", header: "Ilość" },
  { accessorKey: "notes", header: "Notatki" },
];
