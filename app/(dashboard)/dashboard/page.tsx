// export const dynamic = "force-dynamic";

import { fetchIssues } from "@/actions/fetch-issues";
import { Overview } from "@/components/overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Issue } from "@prisma/client";
import { AiFillDatabase } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";
import { TbActivityHeartbeat } from "react-icons/tb";
import DashboardIssues from "./_components/dashboard-issues";
import DashboardAll from "./_components/dashboard-all";

export default async function DashboardPage() {
  const issues: Issue[] = await fetchIssues();

  return (
    <main className=" w-full flex flex-col mb-20">
      <div>
        <h2 className="pl-8 pt-12 md:pt-0  mt-4 text-2xl font-extrabold tracking-tight lg:text-4xl text-slate-600">
          Dashboard
        </h2>
      </div>

      <DashboardAll issues={issues} />
    </main>
  );
}
