export const dynamic = "force-dynamic";

import { fetchIssues } from "@/actions/fetch-issues";
import { Issue } from "@prisma/client";
import AllIssues2 from "./_components/issues-all2";

const IssuesPage = async () => {
  const issues: Issue[] = await fetchIssues();

  return (
    <div className="w-full flex flex-col mb-20">
      <div>
        <h2 className="text-4xl font-bold text-center text-indigo-400 mb-4">
          Tickets
        </h2>
      </div>

      <div className="flex  px-2">
        <AllIssues2 data={issues} />
      </div>
    </div>
  );
};

export default IssuesPage;
