import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { format } from "date-fns";
import { Refueling } from "@/app/api/refuelings/route";
import RefuelCard from "@/app/components/refuel-card";

interface RefuelingRows extends RowDataPacket {
  id: number;
  date: Date;
  liters: string;
  price_per_liter: string;
  odometer: number;
  notes: string | null;
}

export default async function CarPage() {
  // const data = await getData();

  return (
    <div className="flex flex-col gap-5 items-center">
      {/* {data.map((item) => (
        <RefuelCard key={item.id} payload={item} />
      ))} */}
    </div>
  );
}

// const getData = async () => {
//   const db = await createConnection();
//   const sql = "select * from refueling order by date desc;";
//   const [rows] = await db.query<RefuelingRows[]>(sql);

//   if (!Array.isArray(rows)) throw new Error("Must be an array!");

//   return rows.map(({ date, ...row }) => ({
//     id: row.id,
//     date: format(date, "yyyy-MM-dd"),
//     liters: parseFloat(row.liters),
//     pricePerLiter: parseFloat(row.price_per_liter),
//     odometer: row.odometer,
//     notes: row.notes ?? "",
//   }));
// };
