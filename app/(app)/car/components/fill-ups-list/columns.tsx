import { FillUpRecord } from "@/lib/db/schema/fill-up";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { currencyFormat, numberFormat } from "../fill-up-card";

export const columns: ColumnDef<FillUpRecord & { prev: FillUpRecord }>[] = [
  { accessorKey: "date", header: "Data", cell: ({ getValue: v }) => format(new Date(v() as string), "dd.MM.yyyy") },
  {
    accessorKey: "odoCounter",
    header: "Licznik",
    cell: ({ getValue }) => new Intl.NumberFormat("pl-PL", { useGrouping: true }).format(getValue() as number) + " km",
  },
  { accessorKey: "liters", header: "Ilość", cell: ({ getValue }) => numberFormat(getValue() as number) + " l" },
  {
    accessorKey: "pricePerLiter",
    header: "Cena za litr",
    accessorFn: ({ pricePerLiter, discount, liters }) => {
      let price = currencyFormat(pricePerLiter);

      if (discount) {
        const discountPerLiter = discount / liters;
        price += ` \u2192 ${currencyFormat(pricePerLiter - discountPerLiter)}`;
      }

      return price;
    },
  },
  {
    id: "total",
    header: "Kwota",
    accessorFn: ({ liters: l, pricePerLiter: p, discount }) => {
      let value: string;
      const total = l * p;

      value = currencyFormat(total);

      if (discount) value += ` \u2192 ${currencyFormat(total - discount)}`;

      return value;
    },
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "discount",
    header: "Rabat",
    cell: ({ getValue }) => {
      const discount = getValue() as number;
      return discount ? currencyFormat(discount) : "---";
    },
  },
];
