import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonAvatar() {
  return (
    <div className="p-4 max-w-4xl">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}
