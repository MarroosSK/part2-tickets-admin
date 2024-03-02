"use client";

import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

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
import DashboardIssues from "./dashboard-issues";
import { SkeletonBox } from "./skeleton-box";
import { SkeletonLoading } from "./skeleton-loading";

const DashboardAll = ({ issues }: { issues: Issue[] }) => {
  const [status, setStatus] = useState(false);
  const openIssues = issues.filter((issue) => issue.status === "OPEN");
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");
  const isPendingIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  );

  useEffect(() => {
    setStatus(true);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AiFillDatabase />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{status ? <>{issues.length}</> : <SkeletonLoading />}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Issues</CardTitle>
            <LuNetwork />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              + {status ? <>{openIssues.length}</> : <SkeletonLoading />}
            </div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <FaRegEnvelope />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              + {status ? <>{closedIssues.length}</> : <SkeletonLoading />}
            </div>
            <p className="text-xs text-muted-foreground">
              +100 resolved from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <TbActivityHeartbeat />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              + {status ? <>{isPendingIssues.length}</> : <SkeletonLoading />}
            </div>
            <p className="text-xs text-muted-foreground">since last 24 hours</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <Card className=" flex-1 md:flex-shrink-0">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>info in graph</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {status ? <Overview /> : <SkeletonBox />}
          </CardContent>
        </Card>
        <Card className="flex-1 md:flex-shrink-0">
          <CardHeader>
            <CardTitle>Latest Issues</CardTitle>
            <CardDescription>New issues this month.</CardDescription>
          </CardHeader>
          <CardContent>
            {status ? <DashboardIssues issuesList={issues} /> : <SkeletonBox />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAll;
