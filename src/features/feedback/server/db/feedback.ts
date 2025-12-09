import prisma from "@/database";

const TOTAL_LENGTH = 10;

export async function getFeedbacks(cursor: string | null) {
  const decodedCursor = cursor ? decodeCursor(cursor) : null;

  console.log("Decoded Cursor:", decodedCursor);
  const feedbacks = await prisma.feedback.findMany({
    take: TOTAL_LENGTH + 1,
    cursor: decodedCursor ?? undefined,
    omit: { updatedAt: true },
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  });

  const hasMore = feedbacks.length > TOTAL_LENGTH;
  const nextCursor = hasMore
    ? encodeCursor({
        createdAt: feedbacks[TOTAL_LENGTH].createdAt,
        id: feedbacks[TOTAL_LENGTH].id,
      })
    : null;

  return { feedbacks: feedbacks.slice(0, TOTAL_LENGTH), nextCursor, hasMore };
}

export function getFeedbackById(feedbackId: string) {
  return prisma.feedback.findUnique({
    where: { id: feedbackId },
    omit: { updatedAt: true, createdAt: true, upvotes: true },
  });
}

type Cursor = {
  createdAt: Date;
  id: string;
};

function encodeCursor(cursor: Cursor) {
  return Buffer.from(JSON.stringify(cursor)).toString("base64");
}

function decodeCursor(cursor: string): Cursor | null {
  const decoded = Buffer.from(cursor, "base64").toString("utf-8");
  const { createdAt, id } = JSON.parse(decoded);

  return { createdAt: new Date(createdAt), id };
}
