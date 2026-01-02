import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefuelingsRecord } from "@/lib/db/schema/refuelings";

export default function RefuelCard({ payload }: { payload: RefuelingsRecord }) {
  const { pricePerLiter, liters, date, odometer, notes } = payload;
  const cost = (pricePerLiter * liters).toFixed(2);
  const costFormatted = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(Number(cost));

  const odometerFormatted = new Intl.NumberFormat("pl-PL", {
    useGrouping: true,
  }).format(odometer);

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>{costFormatted}</CardTitle>
        <CardDescription>{date.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{notes}</p>
      </CardContent>
      <CardFooter>
        <p>{odometerFormatted} km</p>
      </CardFooter>
    </Card>
  );
}
