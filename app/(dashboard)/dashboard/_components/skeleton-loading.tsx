import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
