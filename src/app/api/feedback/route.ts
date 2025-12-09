import { getFeedbacks } from "@/features/feedback/server/db/feedback";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cursor = request.nextUrl.searchParams.get("cursor");
    const { feedbacks, nextCursor } = await getFeedbacks(cursor);

    return NextResponse.json({ feedbacks, nextCursor });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);

    return NextResponse.json(
      { message: "Failed to fetch feedbacks." },
      { status: 500 },
    );
  }
}
