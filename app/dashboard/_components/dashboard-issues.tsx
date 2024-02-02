"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardIssues = ({ issuesList }: any) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issuesList.slice(0, 3).map((issue1: any) => (
            <TableRow key={issue1.id}>
              <TableCell className="font-medium">
                <Link
                  key={issue1.id}
                  href={`/issues/${issue1.id}`}
                  className="cursor-pointer"
                >
                  {issue1.subject.slice(0, 5)}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn("rounded-sm", {
                    "bg-indigo-400": issue1.status === "OPEN",
                    "bg-green-400": issue1.status === "CLOSED",
                    "bg-yellow-400": issue1.status === "IN_PROGRESS",
                  })}
                >
                  {issue1.status}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                <Link
                  key={issue1.id}
                  href={`/issues/${issue1.id}`}
                  className="cursor-pointer"
                >
                  <Button variant="link">details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Link href="/issues">
          <Button variant="link">Show more</Button>
        </Link>
      </Table>
    </div>
  );
};

export default DashboardIssues;

// AllIssues.Skeleton = function SkeletonBoardList() {
//   return (
//     <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//     </div>
//   );
// };
