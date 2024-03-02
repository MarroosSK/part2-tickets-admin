import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBox() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-[125px] w-full" />
    </div>
  );
}
