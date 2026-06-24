"use client";

import { BudgetList } from "./components/list";
import { AddTransactionDialog } from "./components/add-transaction-dialog";
import { useCallback, useEffect, useState } from "react";
import { Operation } from "@/app/api/budget/transactions/route";
import { Category, CategorySubcategories, Subcategory } from "@/app/api/budget/dictionaries/route";

function useBudgetData() {
  const [data, setData] = useState<Operation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categorySubcategories, setCategorySubcategories] = useState<CategorySubcategories>({});

  const fetchData = useCallback(async () => {
    const [dictRes, transRes] = await Promise.all([
      fetch("/api/budget/dictionaries"),
      fetch("/api/budget/transactions"),
    ]);

    const dictionaries = (await dictRes.json()) as {
      categories: Category[];
      subcategories: Subcategory[];
      categorySubcategories: CategorySubcategories;
    };
    const transactions = await transRes.json();

    setCategories(dictionaries.categories);
    setSubcategories(dictionaries.subcategories);
    setCategorySubcategories(dictionaries.categorySubcategories);

    setData(transactions);
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, categories, subcategories, categorySubcategories, fetchData };
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
