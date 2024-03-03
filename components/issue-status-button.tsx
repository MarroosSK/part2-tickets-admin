"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface IssueStatusButtonProps {
  issueId: string | undefined;
  currentStatus: string | undefined;
}

const IssueStatusButton = ({
  issueId,
  currentStatus,
}: IssueStatusButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);

    try {
      // verifying if picked status is correct
      if (!["OPEN", "IN_PROGRESS", "CLOSED"].includes(newStatus)) {
        console.error("Invalid status:", newStatus);
        return;
      }

      // api call is sending new status to db
      await axios.patch(`/api/issues/${issueId}`, { status: newStatus });
      toast({
        variant: "default",
        title: "Status updated!",
        description: "new status has been stored in db",
      });
      router.refresh();
    } catch (error) {
      console.error("Error has occured during updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="bg-blue-500"
        onClick={() => handleStatusUpdate("OPEN")}
        disabled={loading || currentStatus === "OPEN"}
      >
        {loading && currentStatus === "OPEN" && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Open
      </Button>
      <Button
        className="bg-yellow-500"
        onClick={() => handleStatusUpdate("IN_PROGRESS")}
        disabled={loading || currentStatus === "IN_PROGRESS"}
      >
        {loading && currentStatus === "IN_PROGRESS" && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        In Progress
      </Button>
      <Button
        className="bg-green-500"
        onClick={() => handleStatusUpdate("CLOSED")}
        disabled={loading || currentStatus === "CLOSED"}
      >
        {loading && currentStatus === "CLOSED" && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Closed
      </Button>
    </div>
  );
};

export default IssueStatusButton;
