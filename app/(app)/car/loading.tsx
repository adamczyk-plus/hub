import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-2">
      {/* Nagłówek tabeli */}
      <div className="flex space-x-4 p-2">
        <Skeleton className="h-8 grow" />
        <Skeleton className="h-8 grow" />
        <Skeleton className="h-8 grow-3" />
        <Skeleton className="h-8 grow" />
        <Skeleton className="h-8 grow-2" />
        <Skeleton className="h-8 grow-2" />
      </div>

      {/* Wiersze tabeli */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex space-x-4 p-2">
          <Skeleton className="h-6 grow" />
          <Skeleton className="h-6 grow" />
          <Skeleton className="h-6 grow-3" />
          <Skeleton className="h-6 grow" />
          <Skeleton className="h-6 grow-2" />
          <Skeleton className="h-6 grow-2" />
        </div>
      ))}
    </div>
  );
}
