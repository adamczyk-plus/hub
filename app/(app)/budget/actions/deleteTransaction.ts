import { UUID } from "crypto";

export async function deleteTransaction(id: UUID) {
  const resp = await fetch(`/api/budget/transactions/${id}`, { method: "DELETE" });
  const respJson = await resp.json();
  console.debug(respJson);
}
