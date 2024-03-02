"use server";

import { db } from "@/lib/db";
import { Issue } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export const fetchIssues = async () => {
  noStore();
  const issues: Issue[] | { error: string } = await db.issue.findMany({
    orderBy: { createdAt: "desc" },
  });
  revalidatePath("/dashboard");
  return issues;
};
