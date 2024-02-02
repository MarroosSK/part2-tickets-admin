import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import AllIssues2 from "./_components/issues-all2";
import { Issue } from "@prisma/client";

const IssuesPage = async () => {
  const issues: Issue[] = await db.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full flex flex-col mb-20">
      <div>
        <h2 className="text-4xl font-bold text-center text-indigo-400 mb-4">
          Tickets
        </h2>
      </div>

      <div className="flex  px-2">
        <Suspense fallback={<Skeleton />}>
          <AllIssues2 data={issues} />
        </Suspense>
      </div>
    </div>
  );
};

export default IssuesPage;
