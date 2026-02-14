import { query } from "@/lib/db/db";
import { format } from "date-fns";
import FillUpCard from "@/app/(app)/car/components/fill-up-card";
import { FillUpRecord, FillUpRow } from "@/lib/db/schema/fill-up";
import { AddFillUpDialog } from "./components/add-fill-up-dialog";
import { isMobile } from "@/lib/is-mobile";
import { FillUpsList } from "./components/fill-ups-list/fill-ups-list";

export const revalidate = 0;

export default async function CarPage() {
  const mobile = await isMobile();

  const data = await getData();

  return (
    <div className="flex flex-col gap-5 items-center">
      <AddFillUpDialog isMobile={await isMobile()} />
      {mobile ? <Cards data={data} /> : <FillUpsList data={data} />}
    </div>
  );
}

const Cards = ({ data }: { data: FillUpRecord[] }) =>
  data.map((record, index) => <FillUpCard key={record.id} record={record} prevRecord={data[index + 1]} />);

const getData = async () => {
  const rows = await query<FillUpRow>("select * from fill_ups order by date desc");

  return rows.map(
    ({ date, ...row }) =>
      ({
        id: row.id,
        date: format(date, "yyyy-MM-dd"),
        liters: row.liters,
        pricePerLiter: row.price_per_liter,
        odoCounter: row.odo_counter,
        notes: row.notes ?? "",
        discount: row.discount,
      } as FillUpRecord)
  );
};
