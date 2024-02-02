"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IssueStatusButtonProps {
  issueId: string | undefined;
  currentStatus: string | undefined;
}

const IssueStatusButton = ({
  issueId,
  currentStatus,
}: IssueStatusButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async (newStatus: string) => {
    setLoading(true);

    try {
      // Kontrola platnosti nového statusu
      if (!["OPEN", "IN_PROGRESS", "CLOSED"].includes(newStatus)) {
        console.error("Neplatný nový stav:", newStatus);
        return;
      }

      // Úprava API volania, aby posielal nový status v tele požiadavky
      await axios.patch(`/api/issues/${issueId}`, { status: newStatus });
      toast("Status updated.");
      router.refresh();
    } catch (error) {
      console.error("Chyba pri aktualizácii stavu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="bg-indigo-400"
        onClick={() => handleStatusUpdate("OPEN")}
        disabled={loading || currentStatus === "OPEN"}
      >
        Open
      </Button>
      <Button
        className="bg-yellow-400"
        onClick={() => handleStatusUpdate("IN_PROGRESS")}
        disabled={loading || currentStatus === "IN_PROGRESS"}
      >
        In Progress
      </Button>
      <Button
        className="bg-green-400"
        onClick={() => handleStatusUpdate("CLOSED")}
        disabled={loading || currentStatus === "CLOSED"}
      >
        Closed
      </Button>
    </div>
  );
};

export default IssueStatusButton;
