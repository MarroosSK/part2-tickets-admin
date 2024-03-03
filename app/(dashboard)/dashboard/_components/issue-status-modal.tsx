import IssueStatusButton from "@/components/issue-status-button";
import { Issue } from "@prisma/client";

const IssueStatusModal = ({ data }: { data: Issue }) => {
  return (
    <div>
      <IssueStatusButton issueId={data?.id} currentStatus={data?.status} />
      <div className="w-full flex-1 mt-4 flex flex-col  gap-y-2 border rounded-md p-4">
        <h2 className="pt-12 md:pt-0  mt-4 text-2xl font-extrabold tracking-tight lg:text-4xl text-slate-600">
          {data?.subject}
        </h2>
        <p className="text-sm  text-slate-500">{data?.email}</p>
        <p className="mt-2 text-lg leading-5 text-slate-500">{data?.text}</p>
      </div>
    </div>
  );
};

export default IssueStatusModal;
