import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBox() {
  return (
    <div className="px-4 flex flex-col gap-y-2 w-full mx-auto">
      <Skeleton className="h-[35px] w-full" />
      <Skeleton className="h-[35px] w-full" />
      <Skeleton className="h-[35px] w-full" />
    </div>
  );
}
