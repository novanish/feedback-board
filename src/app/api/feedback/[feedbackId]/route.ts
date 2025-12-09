import { getFeedbackById } from "@/features/feedback/server/db/feedback";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: RouteContext<"/api/feedback/[feedbackId]">,
) {
  try {
    const { feedbackId } = await params;
    const feedback = await getFeedbackById(feedbackId);
    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { message: "Failed to fetch feedback." },
      { status: 500 },
    );
  }
}
