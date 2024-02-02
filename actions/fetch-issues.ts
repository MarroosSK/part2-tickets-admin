"use server";

import { db } from "@/lib/db";
import { Issue } from "@prisma/client";

export const fetchIssues = async () => {
  const issues: Issue[] | { error: string } = await db.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return issues;
};
