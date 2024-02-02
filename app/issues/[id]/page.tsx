import IssueStatusButton from "@/components/ticket-status-button";
import { db } from "@/lib/db";

import React from "react";

interface IssuePageProps {
  params: {
    id: string;
  };
}

const IssuePage = async ({ params }: IssuePageProps) => {
  const oneIssue = await db.issue.findFirst({
    where: {
      id: params.id,
    },
  });

  return (
    <div>
      <IssueStatusButton
        issueId={oneIssue?.id}
        currentStatus={oneIssue?.status}
      />
      <div className="w-full flex-1 mt-4 flex flex-col  gap-y-2 border rounded-md p-4">
        <h2 className="font-semibold text-4xl text-indigo-400">
          {oneIssue?.subject}
        </h2>
        <p className="text-sm  text-slate-500">{oneIssue?.email}</p>
        <p className="mt-2 text-lg leading-5 text-slate-500">
          {oneIssue?.text}
        </p>
      </div>
    </div>
  );
};

export default IssuePage;
