"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addFillUp } from "../actions/add-fill-up";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { DatePicker } from "@/components/common/date-picker";
import { format } from "date-fns";

export function AddFillUpForm() {
  const [, startTransition] = useTransition();
  const [form, setForm] = useState<{
    odo: string;
    liters: string;
    pricePerLiter: string;
    total: string;
    notes: string;
    date?: Date;
    discount: string;
  }>({
    odo: "",
    liters: "",
    pricePerLiter: "",
    total: "",
    notes: "",
    discount: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      odo: Number(form.odo),
      liters: Number(form.liters),
      pricePerLiter: Number(form.pricePerLiter),
      notes: form.notes,
      date: form.date ? format(form.date, "yyyy-MM-dd") : "",
      discount: Number(form.discount),
    };

    startTransition(async () => {
      const err = await addFillUp(payload);
      console.debug(err);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (!["liters", "pricePerLiter"].includes(name)) return;

    const data = new FormData(e.currentTarget);
    const liters = Number(data.get("liters"));
    const pricePerLiter = Number(data.get("pricePerLiter"));

    const totalNumber = liters * pricePerLiter;
    const total = Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(totalNumber);

    setForm(prev => ({ ...prev, total }));
  };

  const updateForm = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form className="grid items-start gap-6" onSubmit={handleSubmit} onChange={handleChange}>
      <div className="grid gap-1 grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="odo">Licznik</Label>
          <Input id="odo" name="odo" value={form.odo} onChange={updateForm}></Input>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="liters">Litry</Label>
          <Input id="liters" name="liters" value={form.liters} onChange={updateForm}></Input>
        </div>
      </div>
      <div className="grid gap-1 grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="pricePerLiter">Cena za litr</Label>
          <Input id="pricePerLiter" name="pricePerLiter" value={form.pricePerLiter} onChange={updateForm}></Input>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="discount">Rabat</Label>
          <Input id="discount" name="discount" value={form.discount} onChange={updateForm}></Input>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="grid gap-1">
          <Label htmlFor="total">Całkowity koszt</Label>
          <Input id="total" readOnly value={form.total}></Input>
        </div>
        <DatePicker date={form.date} setDate={date => setForm(prev => ({ ...prev, date }))} />
      </div>
      <Input placeholder="Dodatkowe uwagi" name="notes" value={form.notes} onChange={updateForm}></Input>
      {/* {error && <p className="text-red-600 font-bold">{error}</p>} */}
      <Button>Zapisz</Button>
    </form>
  );
}
