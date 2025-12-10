import { getFeedbacks } from "@/features/feedback/server/db/feedback";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const status = searchParams.get("status");
    const { feedbacks, nextCursor } = await getFeedbacks(cursor, status);

    return NextResponse.json({ feedbacks, nextCursor });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);

    return NextResponse.json(
      { message: "Failed to fetch feedbacks." },
      { status: 500 },
    );
  }
}
