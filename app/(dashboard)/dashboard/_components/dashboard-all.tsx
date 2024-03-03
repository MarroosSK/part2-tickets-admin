"use client";

export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Issue } from "@prisma/client";
import { AiFillDatabase } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";
import { TbActivityHeartbeat } from "react-icons/tb";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import DashboardIssuesGrid from "./dashboard-issues-grid";

import { columns } from "./columns";

import { GridIcon, List } from "lucide-react";
import { DashboardIssuesTable } from "./dashboard-issues-table";
import FormInputs from "./form-inputs";

const DashboardAll = ({ issues }: { issues: Issue[] }) => {
  //const [status, setStatus] = useState(false);
  const openIssues = issues.filter((issue) => issue.status === "OPEN");
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");
  const isPendingIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  );

  // useEffect(() => {
  //   setStatus(true);
  // }, []);

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AiFillDatabase />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{issues.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <LuNetwork />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* + {status ? <>{openIssues.length}</> : <SkeletonLoading />} */}
              {openIssues.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <FaRegEnvelope />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+ {closedIssues.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <TbActivityHeartbeat />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+ {isPendingIssues.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-14 flex flex-col  gap-2">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-600">Latest issues</h2>

          {/* dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Issue</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <FormInputs />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {issues && issues.length === 0 && (
          <div className="flex flex-col gap-4 w-full items-center mt-12">
            <Image
              alt="Image of directory is empty"
              width="300"
              height="300"
              src="/empty.svg"
            />
            <p className="text-2xl">There are no issues available...</p>
          </div>
        )}

        {/* tabs */}
        <Tabs defaultValue="grid">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <GridIcon /> Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <List /> Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardIssuesGrid issuesList={issues} />
            </div>
          </TabsContent>
          <TabsContent value="table">
            {" "}
            <div className="">
              <DashboardIssuesTable columns={columns} data={issues} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardAll;
