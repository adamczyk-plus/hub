"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FillUpRecord } from "@/lib/db/schema/fill-up";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { MoveRightIcon } from "lucide-react";

const numberFormat = (v: number) =>
  new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);

const currencyFormat = (v: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(Number(v));

export default function FillUpCard({ record, prevRecord }: { record: FillUpRecord; prevRecord?: FillUpRecord }) {
  const { liters, date, odoCounter } = record;

  const odo = new Intl.NumberFormat("pl-PL", {
    useGrouping: true,
  }).format(odoCounter);

  const stats = prevRecord ? getStats(record, prevRecord) : null;

  return (
    <Card className="w-19/20 md:w-100">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{format(date, "yyyy-MM-dd", { locale: pl })}</span>
          <TotalCostLabel record={record} />
        </CardTitle>
        <CardDescription className="flex justify-between">
          <span>{numberFormat(liters)} l</span>
          <PricePerLiterLabel record={record} />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex flex-col items-start">
          <p>{odo} km</p>
          {stats && <p className="text-gray-600 text-sm">{stats.tripDistance} km</p>}
        </div>
        <div>{stats && <b className={stats.consumptionStyle}>{stats.fuelConsumption} l/100 km</b>}</div>
      </CardFooter>
    </Card>
  );
}

const PricePerLiterLabel = ({ record: { pricePerLiter, discount, liters } }: { record: FillUpRecord }) => (
  <div className="flex gap-2 items-center self-end tracking-tight">
    <span>{currencyFormat(pricePerLiter)}/l</span>

    {!!discount && (
      <>
        <MoveRightIcon className="inline w-3 h-3" />
        {currencyFormat(pricePerLiter - discount / liters)}/l
      </>
    )}
  </div>
);

const TotalCostLabel = ({ record: { pricePerLiter, liters, discount } }: { record: FillUpRecord }) => {
  const total = pricePerLiter * liters;
  const totalDiscounted = pricePerLiter * liters - discount;

  return (
    <div className="flex gap-2 items-center self-end tracking-tight">
      <span>{currencyFormat(total)}</span>
      {!!discount && (
        <>
          <MoveRightIcon className="inline w-4 h-4" />
          {currencyFormat(totalDiscounted)}
        </>
      )}
    </div>
  );
};

function getStats(record: FillUpRecord, prev: FillUpRecord) {
  const tripDistance = record.odoCounter - prev.odoCounter;
  const fuelConsumption = (record.liters / tripDistance) * 100;
  const fuelConsumptionParsed = numberFormat(fuelConsumption);
  const consumptionStyle = fuelConsumption < 6 ? "text-green-500" : "text-red-500";

  return { tripDistance, fuelConsumption: fuelConsumptionParsed, consumptionStyle };
}
