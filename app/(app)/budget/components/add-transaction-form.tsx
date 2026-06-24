import { Category, CategorySubcategories, Subcategory } from "@/app/api/budget/dictionaries/route";
import { DatePicker } from "@/components/common/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface FormValues {
  date?: Date;
  categoryId?: number;
  subcategoryId?: number;
  amount: string;
  descr: string;
}

export function AddTransactionForm({
  closeDialog,
  refresh,
  subcategories,
  categories,
  categorySubcategories,
}: {
  closeDialog: () => void;
  refresh: () => Promise<void>;
  categories: Category[];
  subcategories: Subcategory[];
  categorySubcategories: CategorySubcategories;
}) {
  const [form, setForm] = useState<FormValues>({
    date: new Date(),
    categoryId: undefined,
    subcategoryId: undefined,
    amount: "",
    descr: "",
  });

  const getSubcategoryById = (subcategoryId: number) => subcategories.find(({ id }) => id === subcategoryId);

  const updateForm = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const subcats = form.categoryId ? (categorySubcategories?.[form.categoryId] ?? []) : [];

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
      <Select
        value={form.categoryId?.toString()}
        onValueChange={categoryId => {
          console.debug(categorySubcategories);
          setForm(prev => ({ ...prev, categoryId: +categoryId }));
        }}
      >
        <SelectTrigger className="w-full col-span-3" size="sm">
          <SelectValue placeholder="Kategoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map(({ id, name }) => (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={form.subcategoryId?.toString()}
        onValueChange={subcategoryId => setForm(prev => ({ ...prev, subcategoryId: +subcategoryId }))}
      >
        <SelectTrigger className="w-full col-span-2" size="sm">
          <SelectValue placeholder="Podkategoria" />
        </SelectTrigger>
        {subcats.length ? (
          <SelectContent>
            <SelectGroup>
              {subcats.map(id => (
                <SelectItem key={id} value={id.toString()}>
                  {getSubcategoryById(id)?.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        ) : null}
      </Select>
      <div className="col-span-2">
        <DatePicker date={form.date} setDate={date => setForm(prev => ({ ...prev, date }))} />
      </div>
      <Input className="h-8 col-span-4" placeholder="Dodatkowy opis" name="descr" onChange={updateForm}></Input>
      <Button className="col-start-4 ">Dodaj</Button>
    </form>
  );
}
