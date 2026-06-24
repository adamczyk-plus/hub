export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(value);
