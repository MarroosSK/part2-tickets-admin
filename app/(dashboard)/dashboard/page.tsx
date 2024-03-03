// export const dynamic = "force-dynamic";

import { fetchIssues } from "@/actions/fetch-issues";
import { Issue } from "@prisma/client";
import DashboardAll from "./_components/dashboard-all";
import { Suspense } from "react";
import { SkeletonBox } from "@/components/skeletons/skeleton-box";

export default async function DashboardPage() {
  const issues: Issue[] = await fetchIssues();

  return (
    <main className=" w-full flex flex-col mb-20">
      <div>
        <h2 className="pl-8 pt-12 md:pt-0  mt-4 text-2xl font-extrabold tracking-tight lg:text-4xl text-slate-600">
          Dashboard
        </h2>
      </div>
      <Suspense fallback={<SkeletonBox />}>
        <DashboardAll issues={issues} />
      </Suspense>
    </main>
  );
}
