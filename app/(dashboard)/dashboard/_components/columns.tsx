"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Issue } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DashboardIssuesActions } from "./dashboard-issues-actions";
import IssueStatusModal from "./issue-status-modal";

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "subject",
    header: "subject",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <p className="font-semibold">{row.original.subject}</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <IssueStatusModal data={row.original} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "text",
    header: "text",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          className={cn(" rounded-sm", {
            "bg-blue-500": row.original.status === "OPEN",
            "bg-green-500": row.original.status === "CLOSED",
            "bg-yellow-500": row.original.status === "IN_PROGRESS",
          })}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    header: "actions",
    cell: ({ row }) => {
      return (
        <div>
          <DashboardIssuesActions issueId={row.original.id} />
        </div>
      );
    },
  },
];
