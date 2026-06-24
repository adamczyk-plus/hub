import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AddTransactionForm } from "./add-transaction-form";
import { Category, CategorySubcategories, Subcategory } from "@/app/api/budget/dictionaries/route";

export function AddTransactionDialog({
  fetchData: refresh,
  categories,
  subcategories,
  categorySubcategories,
}: {
  fetchData: () => Promise<void>;
  categories: Category[];
  subcategories: Subcategory[];
  categorySubcategories: CategorySubcategories;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Dodaj wpis</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="" className="w-sm">
        <DialogHeader>
          <DialogTitle>Nowy wpis budżetowy</DialogTitle>
        </DialogHeader>
        <AddTransactionForm
          closeDialog={() => setOpen(false)}
          refresh={refresh}
          categories={categories}
          subcategories={subcategories}
          categorySubcategories={categorySubcategories}
        />
      </DialogContent>
    </Dialog>
  );
}
