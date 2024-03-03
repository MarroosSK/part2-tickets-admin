import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonIssues() {
  return (
    <div className="mt-4 p-8 w-full flex flex-col gap-y-2 ">
      <div>
        <Skeleton className="h-6 w-[300px]" />
      </div>
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}
