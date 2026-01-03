import { query } from "@/lib/db/db";
import { format } from "date-fns";
import RefuelCard from "@/app/components/refuel-card";
import { RefuelingsRow } from "@/lib/db/schema/refuelings";

export const revalidate = 0;

export default async function CarPage() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-5 items-center">
      {data.map((item) => (
        <RefuelCard key={item.id} payload={item} />
      ))}
    </div>
  );
}

const getData = async () => {
  const rows = await query<RefuelingsRow>(
    "select * from refueling order by date desc"
  );

  return rows.map(({ date, ...row }) => ({
    id: row.id,
    date: format(date, "yyyy-MM-dd"),
    liters: row.liters,
    pricePerLiter: row.price_per_liter,
    odometer: row.odometer,
    notes: row.notes ?? "",
  }));
};
