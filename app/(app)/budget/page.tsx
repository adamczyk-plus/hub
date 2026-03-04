"use client";

import { BudgetList } from "./components/list";
import { AddTransactionDialog } from "./components/add-transaction-dialog";
import { useCallback, useEffect, useState } from "react";
import { Transaction } from "@/app/api/budget/transactions/route";
import { Category, Store } from "@/app/api/budget/dictionaries/route";

function useBudgetData() {
  const [data, setData] = useState<Transaction[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = useCallback(async () => {
    const [dictRes, transRes] = await Promise.all([
      fetch("/api/budget/dictionaries"),
      fetch("/api/budget/transactions"),
    ]);

    const dictionaries = (await dictRes.json()) as { stores: Store[]; categories: Category[] };
    const transactions = await transRes.json();

    setStores(dictionaries.stores);
    setCategories(dictionaries.categories);
    setData(transactions);
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, stores, categories, fetchData };
}

export default function BudgetPage() {
  const budget = useBudgetData();

  return (
    <div>
      <AddTransactionDialog {...budget} />
      <BudgetList {...budget} />
    </div>
  );
}
