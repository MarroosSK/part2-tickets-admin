"use server";

import { db } from "@/lib/db";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export const deleteIssues = async (id: string) => {
  noStore();
  await db.issue.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard");
};
