"use client";

import { useEffect, useState } from "react";
import RefuelCard from "./components/refuel-card";
import { Refueling } from "./api/refuelings/route";
import Menu from "./components/menu";
import { Button } from "@/components/ui/button";
import AddRefuelingDialog from "./components/add-refueling-dialog";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { NavMenu } from "./components/nav-menu";

export default function Home() {
  // const [data, setData] = useState<Refueling[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch("/api/refuelings");
  //     const response = await data.json();
  //     setData(response);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>home</>
    // <div className="flex justify-center pt-2"></div>

    // {/* <AddRefuelingDialog />
    // <div className="container mx-auto py-10">
    //   <DataTable columns={columns} data={data} />
    // </div> */}
    // {/* <div className="w-screen flex flex-col items-center gap-1">
    //   {!data.length ? (
    //     <p>Loading...</p>
    //   ) : (
    //     data.map((item) => <RefuelCard key={item.id} payload={item} />)
    //   )}
    // </div> */}
  );
}
