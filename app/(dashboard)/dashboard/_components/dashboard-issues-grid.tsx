import { Issue } from "@prisma/client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpRightFromSquareIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardIssuesActions } from "./dashboard-issues-actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import IssueStatusModal from "./issue-status-modal";

const DashboardIssuesGrid = ({ issuesList }: { issuesList: Issue[] }) => {
  return (
    <>
      {issuesList &&
        issuesList.map((issue) => (
          <Card key={issue.id} className="hover:bg-slate-600/20">
            <CardHeader className="relative">
              <CardTitle className="mt-6 text-2xl font-bold cursor-pointer">
                {/* dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <p>{issue.subject}</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription>
                        <IssueStatusModal data={issue} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <div className="absolute top-2 right-2">
                <DashboardIssuesActions issueId={issue.id} />
              </div>
              <Badge
                className={cn("absolute top-2 left-2 rounded-sm", {
                  "bg-blue-500": issue.status === "OPEN",
                  "bg-green-500": issue.status === "CLOSED",
                  "bg-yellow-500": issue.status === "IN_PROGRESS",
                })}
              >
                {issue.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">
                {issue.text}
              </p>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default DashboardIssuesGrid;
