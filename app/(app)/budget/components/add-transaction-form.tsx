import { Category, Store } from "@/app/api/budget/dictionaries/route";
import { DatePicker } from "@/components/common/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UUID } from "crypto";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface FormValues {
  date?: Date;
  categoryId: UUID | "";
  storeId: UUID | "";
  amount: string;
  descr: string;
}

export function AddTransactionForm({
  closeDialog,
  refresh,
  stores,
  categories,
}: {
  closeDialog: () => void;
  refresh: () => Promise<void>;
  categories: Category[];
  stores: Store[];
}) {
  const [form, setForm] = useState<FormValues>({
    date: new Date(),
    categoryId: "",
    storeId: "",
    amount: "",
    descr: "",
  });

  const groups = categories
    .filter(cat => !cat.parentId)
    .map(cat => {
      const children = categories.filter(child => child.parentId === cat.id);
      return { ...cat, children };
    });

  const updateForm = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/budget/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();

      if (!resp.ok) throw new Error(data?.message || "Wystąpił błąd serwera");

      toast.success("Dodano!", { richColors: true });
      closeDialog();
      await refresh();
    } catch (err) {
      let message = "Nieznany błąd!";
      if (err instanceof Error) message = err.message;

      toast.error(message, { richColors: true, duration: 10 * 1000 });
    }
  };

  return (
    <form className="grid items-start gap-1 grid-cols-4" onSubmit={handleSubmit}>
      <Input
        className="h-8"
        placeholder="Kwota"
        name="amount"
        value={form.amount}
        onChange={updateForm}
        inputMode="decimal"
        pattern="[0-9]+(\.[0-9]+)?"
      />
      <Select value={form.categoryId} onValueChange={(categoryId: UUID) => setForm(prev => ({ ...prev, categoryId }))}>
        <SelectTrigger className="w-full col-span-3" size="sm">
          <SelectValue placeholder="Kategoria" />
        </SelectTrigger>
        <SelectContent>
          {groups.map(group => (
            <SelectGroup key={group.id}>
              <SelectLabel>{group.name}</SelectLabel>
              {group.children.map(child => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      <Select value={form.storeId} onValueChange={(storeId: UUID) => setForm(prev => ({ ...prev, storeId }))}>
        <SelectTrigger className="w-full col-span-2" size="sm">
          <SelectValue placeholder="Sklep" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {stores.map(store => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="col-span-2">
        <DatePicker date={form.date} setDate={date => setForm(prev => ({ ...prev, date }))} />
      </div>
      <Input className="h-8 col-span-4" placeholder="Dodatkowy opis" name="descr" onChange={updateForm}></Input>
      <Button className="col-start-4 ">Dodaj</Button>
    </form>
  );
}
