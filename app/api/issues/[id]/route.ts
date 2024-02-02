// PATCH API

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { status } = body;

  const issue = await db.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // Kontrola platnosti nového statusu
  if (!["OPEN", "IN_PROGRESS", "CLOSED"].includes(status)) {
    return NextResponse.json({ error: "Neplatný nový stav" }, { status: 400 });
  }

  const updatedIssue = await db.issue.update({
    where: { id: issue.id },
    data: {
      status,
    },
  });

  return NextResponse.json(updatedIssue);
}
