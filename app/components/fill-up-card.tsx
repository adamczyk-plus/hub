"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FillUpRecord } from "@/lib/db/schema/fill-up";

export default function FillUpCard({ payload }: { payload: FillUpRecord }) {
  const { pricePerLiter, liters, date, odoCounter, notes } = payload;
  const cost = (pricePerLiter * liters).toFixed(2);
  const costFormatted = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(Number(cost));

  const odo = new Intl.NumberFormat("pl-PL", {
    useGrouping: true,
  }).format(odoCounter);

  return (
    <Card className="w-19/20 md:w-96">
      <CardHeader>
        <CardTitle>{costFormatted}</CardTitle>
        <CardDescription>{date.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{notes}</p>
      </CardContent>
      <CardFooter>
        <p>{odo} km</p>
      </CardFooter>
    </Card>
  );
}
