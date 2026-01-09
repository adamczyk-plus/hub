"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(date);
}

export function DatePicker({ date, setDate }: { date?: Date; setDate: (_1?: Date) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <Label>Data</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full justify-between font-normal">
            {date ? formatDate(date) : "Wybierz datę"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow- p-0">
          <Calendar
            fixedWeeks
            weekStartsOn={1}
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={date => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
