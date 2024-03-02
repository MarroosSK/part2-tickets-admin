//export const dynamic = "force-dynamic";

import { fetchIssues } from "@/actions/fetch-issues";
import { Issue } from "@prisma/client";
import AllIssues from "./_components/issues-all";

const IssuesPage = async () => {
  const issues: Issue[] = await fetchIssues();

  return (
    <div className="w-full flex flex-col mb-20">
      <div>
        <h2 className="pl-8 pt-12 md:pt-0 mt-4 text-2xl font-extrabold tracking-tight lg:text-4xl text-slate-600">
          Issues
        </h2>
      </div>

      <div>
        <AllIssues data={issues} />
      </div>
    </div>
  );
};

export default IssuesPage;
