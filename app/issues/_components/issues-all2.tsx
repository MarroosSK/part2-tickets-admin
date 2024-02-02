"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";

const AllIssues2 = ({ data }: { data: Issue[] }) => {
  const router = useRouter();

  const currentStatus: string[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);
  const [ticketStatus, setTicketStatus] = useState<string>("");
  const [searchSubject, setSearchSubject] = useState<string>("");
  const [filterName, setFilterName] = useState<Issue[]>(data);

  const filterData = () => {
    const subjectFilteredData = data.filter((item: Issue) =>
      item.subject.toLowerCase().includes(searchSubject.toLowerCase())
    );

    const statusFilteredData =
      ticketStatus !== ""
        ? subjectFilteredData.filter(
            (item: Issue) => item.status === ticketStatus
          )
        : subjectFilteredData;

    setFilterName(statusFilteredData);
  };

  const resetFilter = () => {
    setTicketStatus("");
  };
  useEffect(() => {
    router.refresh();
    filterData();
    // eslint-disable-next-line
  }, [searchSubject, ticketStatus]);
  return (
    <div className="w-full">
      <Input
        placeholder="Filter subject..."
        value={searchSubject}
        onChange={(event) => setSearchSubject(event.target.value)}
        className="max-w-sm mb-2"
      />

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:block">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="relative flex items-center  gap-x-2 ">
              Status{" "}
              <ArrowUpDown
                size={20}
                onClick={() => setShowStatusOptions(!showStatusOptions)}
                className="cursor-pointer hover:text-slate-800"
              />
              {showStatusOptions && (
                <div className="p-2 z-10 absolute top-10 left-0 w-48 h-20 bg-slate-100 rounded-md ">
                  {currentStatus.map((item, index) => (
                    <p
                      key={index}
                      className="pl-2 text-slate-500 hover:text-slate-800 cursor-pointer"
                      onClick={() => {
                        setTicketStatus(item);
                        setShowStatusOptions(false);
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
              {ticketStatus !== "" && (
                <X onClick={() => resetFilter()} className="text-red-600" />
              )}
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterName.map((issue1: any) => (
            <TableRow key={issue1.id}>
              <TableCell className="font-medium hidden md:block">
                {issue1.id}
              </TableCell>
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
      </Table>
    </div>
  );
};

export default AllIssues2;
