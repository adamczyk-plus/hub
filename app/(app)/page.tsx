import { HouseHeartIcon } from "lucide-react";
import { DataTableDemo } from "../components/data-table-demo";

export default function AppPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      {/* <HouseHeartIcon size={300} color="#333" /> */}
      <DataTableDemo />
    </div>
  );
}
