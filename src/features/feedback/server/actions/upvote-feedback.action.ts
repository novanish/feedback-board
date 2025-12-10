"use server";

import prisma from "@/database";
import {
  UpvoteInput,
  UpvoteSchema,
} from "@/features/feedback/schema/upvote-schema";

export async function upvoteFeedback(unsafeInput: UpvoteInput) {
  const result = UpvoteSchema.safeParse(unsafeInput);
  if (!result.success) throw new Error("Invalid input");

  await prisma.feedback.update({
    where: { id: result.data.feedbackId },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });
}
