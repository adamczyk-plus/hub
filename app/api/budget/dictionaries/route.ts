import { query } from "@/lib/db/db";

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface CategorySubcategoriesRow {
  category_id: string;
  subcategory_id: string;
}

export type CategorySubcategories = Record<number, number[]>;

export async function GET() {
  const result = {
    categories: await getCategories(),
    subcategories: await getSubcategories(),
    categorySubcategories: await getCategorySubcategories(),
  };
  return Response.json(result);
}

async function getCategories() {
  const sql = "select * from finance.categories";
  return await query<Category>(sql);
}

async function getSubcategories() {
  const sql = "select * from finance.subcategories";
  return await query<Subcategory>(sql);
}

async function getCategorySubcategories() {
  const result: CategorySubcategories = {};
  const sql = "select * from finance.category_subcategories";
  const rows = await query<CategorySubcategoriesRow>(sql);
  rows.forEach(({ category_id, subcategory_id }) => {
    if (!result[+category_id]) result[+category_id] = [];

    result[+category_id].push(+subcategory_id);
  });

  return result;
}
